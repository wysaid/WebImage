/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ data: 2013-8-24
*/


function renderGLWithScriptName(scriptName) {
    clearInterval(g_timeInterval);
    switch (scriptName)  //switch with a non-integer is so cool~ just be difference from cpp
    {
        //the cases should contain the whole 'effectsEnum'
        case "wave-h":
            renderWaveH();
            break;
        case "wave-v":
            renderWaveV();
            break;
        case "avg-blur-0.5":
            renderAvgBlur(0.5);
            break;
        case "avg-blur-1.0":
            renderAvgBlur(1.0);
            break;
        case "avg-edge-alpha":
            renderAvgBlur(2.0);
            break;
        case "avg-edge-beta":
            renderAvgBlur(5.0);
            break;
        case "avg-edge-gama":
            renderAvgBlur(10.0);
            break;
        case "avg-detail-alpha":
            renderAvgBlur(-2.0);
            break;
        case "avg-detail-beta":
            renderAvgBlur(-5.0);
            break;
        case "avg-detail-gama":
            renderAvgBlur(-10.0);
            break;


        case "avg-emboss":
            renderWithSteps(scriptName);
            break;

        default: //"default-fsh"
            renderDefault(scriptName);
    }
}