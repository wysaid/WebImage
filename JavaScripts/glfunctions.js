/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ data: 2013-8-24
*/

var startIndex = 1;
var webglTextureArray = new Array();
var webgl = null;
var vertexShaderObject = null;
var fragmentShaderObject = null;
var programObject = null;
var v4PositionIndex = 0;
var verticesData =
[
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    1.0, 1.0
];

//widthStep, heightStep and aspectRatio should be set when GL is first initialized!
var widthStep = 0.0;
var heightStep = 0.0;
var aspectRatio = 0.0;

function ShaderSourceFromScript(scriptID) {
    var shaderScript = document.getElementById(scriptID);
    if (shaderScript == null) return "";

    if (shaderScript.textContent != null && shaderScript.textContent != "") {
        return shaderScript.textContent;
    }
    if (shaderScript.text != null && shaderScript.text != "") {
        return shaderScript.text;
    }
    var sourceCode = "";
    var child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType == child.TEXT_NODE) sourceCode += child.textContent;
        child = child.nextSibling;
    }
    return sourceCode;
}

function requestURLText(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "Shaders/" + url, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}

function loadFragmentShaderSourceFromFile(scriptID) {
    var shaderScript = document.createElement("script");
    shaderScript.type = "x-shader/x-fragment";
    shaderScript.id = scriptID;
    shaderScript.innerHTML = requestURLText(scriptID + ".fsh");
    var head = document.getElementsByTagName("body").item(0);
    head.appendChild(shaderScript);
}

function loadVertexShaderSourceFromFile(scriptID) {
    var shaderScript = document.createElement("script");
    shaderScript.type = "x-shader/x-vertex";
    shaderScript.id = scriptID;
    shaderScript.innerText = requestURLText(scriptID + ".vsh");
    var head = document.getElementsByTagName("body").item(0);
    head.appendChild(shaderScript);
}

function webglInit() {
    var myCanvasObject = document.getElementById("fxView");
    webgl = myCanvasObject.getContext("experimental-webgl");
    if (!webgl) { alert("wy: Your browser doesnot support WebGL! Try again with chrome or firefox!!"); return; }
    webgl.viewport(0, 0, myCanvasObject.clientWidth, myCanvasObject.clientHeight);
    widthStep = 1.0 / myCanvasObject.clientWidth;
    heightStep = 1.0 / myCanvasObject.clientHeight;
    aspectRatio = myCanvasObject.clientWidth / myCanvasObject.clientHeight;

    vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER);
    fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER);

    webglTextureArray[0] = webgl.TEXTURE0;
    webglTextureArray[1] = webgl.TEXTURE1;
    webglTextureArray[2] = webgl.TEXTURE2;
    webglTextureArray[3] = webgl.TEXTURE3;
    webglTextureArray[4] = webgl.TEXTURE4;
    webglTextureArray[5] = webgl.TEXTURE5;
    webglTextureArray[6] = webgl.TEXTURE6;
    webglTextureArray[7] = webgl.TEXTURE7;
    webglTextureArray[8] = webgl.TEXTURE8;
    webglTextureArray[9] = webgl.TEXTURE9;
    webglTextureArray[10] = webgl.TEXTURE10;
}

function shaderInitWithFragmentShaderID(fragID) {
    shaderInitWithVertexAndFragmentShaderID("default-vsh", fragID);
}

function shaderInitWithVertexAndFragmentShaderID(vertID, fragID) {
    var vshaderSource = ShaderSourceFromScript(vertID);
    var fshaderSource = ShaderSourceFromScript(fragID);
    if (vshaderSource == "") {
        loadVertexShaderSourceFromFile(vertID);
        vshaderSource = ShaderSourceFromScript(vertID);
    }
    if (fshaderSource == "") {
        loadFragmentShaderSourceFromFile(fragID);
        fshaderSource = ShaderSourceFromScript(fragID);
    }
    webgl.shaderSource(vertexShaderObject, vshaderSource);
    webgl.shaderSource(fragmentShaderObject, fshaderSource);
    webgl.compileShader(vertexShaderObject);
    webgl.compileShader(fragmentShaderObject);
    if (!webgl.getShaderParameter(vertexShaderObject, webgl.COMPILE_STATUS)) { alert(webgl.getShaderInfoLog(vertexShaderObject) + "test1"); return; }
    if (!webgl.getShaderParameter(fragmentShaderObject, webgl.COMPILE_STATUS)) { alert(webgl.getShaderInfoLog(fragmentShaderObject) + "test2"); return; }
}

function initShaderProgram() {
    programObject = webgl.createProgram();  //the program is used only once in a fx
    webgl.attachShader(programObject, vertexShaderObject);
    webgl.attachShader(programObject, fragmentShaderObject);
    webgl.bindAttribLocation(programObject, v4PositionIndex, "position");
    webgl.linkProgram(programObject);
    if (!webgl.getProgramParameter(programObject, webgl.LINK_STATUS)) {
        alert(webgl.getProgramInfoLog(programObject));
        return;
    }
    webgl.useProgram(programObject);

    var buffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(verticesData), webgl.STATIC_DRAW);

    webgl.enableVertexAttribArray(v4PositionIndex);
    webgl.vertexAttribPointer(v4PositionIndex, 2, webgl.FLOAT, false, 0, 0);
}

function loadImageTexture(textureName) {
    var textureObject = webgl.createTexture();
    webgl.bindTexture(webgl.TEXTURE_2D, textureObject);

    var img = document.getElementById(textureName);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGB, webgl.RGB, webgl.UNSIGNED_BYTE, img);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

    return textureObject;
}

function initInputImageTexture(inputImgName) {
    var obj = loadImageTexture(inputImgName);   //'obj' is already binded
    webgl.activeTexture(webgl.TEXTURE0);
    var uniform = webgl.getUniformLocation(programObject, "inputImageTexture");
    webgl.uniform1i(uniform, 0);
}