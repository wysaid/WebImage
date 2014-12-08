/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/


function renderGLWithScriptName(scriptName) {
    clearInterval(g_timeInterval);
    currentEffect = scriptName;
    effectKind = 0;
    switch (scriptName)  //switch with a non-integer is so cool~ just be different from cpp
    {
        //the cases should contain the whole 'effectsEnum'
        case "wave-h":
        case "wave-v":
        case "wave-h-v":
            renderWave(scriptName);
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
        case "avg-only-edge":
        case "tilt-shift":
        case "gaussion-blur":
            renderWithSteps(scriptName);
            break;
        case "avg-glass-alpha":
            renderWithStepsAndSpecialUniform1f("avg-blur-random", "blurRadiusScale", 1.0);
            break;
        case "avg-glass-beta":
            renderWithStepsAndSpecialUniform1f("avg-blur-random", "blurRadiusScale", 3.0);
            break;
        case "avg-glass-gama":
            renderWithStepsAndSpecialUniform1f("avg-blur-random", "blurRadiusScale", 6.0);
            break;
        case "two-value-black-white":
            renderWithDynamicStrength(scriptName);
            break;
        case "tilt-shift-vector":
            renderTiltShiftVector(scriptName);
            break;
        case "tilt-shift-circle":
            renderTiltShiftCircle(scriptName);
            break;
        case "motion-ball":
            renderWithDynamicMotion(scriptName);
            break;
        case "testing-functions":
            renderTests(scriptName);
            break;
        default: //"default-fsh"
            renderDefault(scriptName);
    }
    uiAppendLog("Render " + scriptName + " Complete!");
}

/////////////////////////////

function renderGLWithFXNumber(fxnum) {
    clearInterval(g_timeInterval);
    if(fxShaderEnum[fxnum] == "nil") {
        return ;
    }
    currentEffect = fxnum;
    effectKind = 1;
    switch(fxnum)
    {
        case 0:
        case 1:
        case 3:
        case 4:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.1, 0.9, 0.0, 0.85);
            break;
        case 2:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.1, 0.8, 0.0, 0.85);
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 102:
        case 103:
        case 117:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], -1.0, -1.0, 1.0, 2.0);
            break;
        case 28:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.85, 0.0, 0.8);
            break;
        case 29:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.2, 0.8, 1.0, 2.0);
            break;
        case 30:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.45, 0.55, 1.0, 2.0);
            break;
        case 31:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.75, 1.0, 2.0);
            break;
        case 32:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.25, 0.99, 1.0, 2.0);
            break;
        case 33:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.9, 0.0, 1.0);
            break;
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 111:
        case 114:
        case 116:
            
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.9, 1000.0, 0.0);
            break;
            
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], -1.0, -1.0, 0.0, 0.6);
            break;
        case 21:
        case 71:
        case 84:
        case 88:
        case 89:
        case 92:
        case 96:
        case 99:
            renderFXWithStepsAndRatio(fxShaderEnum[fxnum], fxSouceEnum[fxnum]);
            break;
            
        case 91:
        case 98:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], -1.0, -1.0, 0.0, 0.85);
            break;
        case 93: case 94:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.99, 0.0, 0.8);
            break;
            
        case 101:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.3);
            break;
            
        case 104:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], -1.0, -1.0, 0.0, 2.0);
            break;
            
        case 105:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.1, 0.9, 0.0, 1.8);
            break;
        case 106:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.9, 0.0, 1.9);
            break;
            
        case 107:
        case 108:
        case 109:
        case 110:
        case 112:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.99, 0.0, 1.8);
            break;

        case 118:
            renderFXWithSaturateBoundlVignette(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.01, 0.8, 0.0, 0.85);
            break;

        case 175:
        case 176:
        case 178:
        case 179:
        case 181:
        case 186:
        case 353:
        case 355:
        case 356:
        case 368:
        case 379:
        case 393:
        case 396:
        case 460:
        case 466:
        case 470:
        case 471:
        case 476:
        case 478:
        case 479:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.8);
            break;
        case 177: case 190:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.5);
            break;
        case 182: case 465: case 468:case 428: case 430: case 432:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.6);
            break;
        case 187:
        case 189:
        case 363:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.7);
            break;

        case 351:
        case 352:
        case 354:
        case 474:
        case 475:
        case 477:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.9);
            break;
        case 446:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.28);
            break;
        case 427: case 429:
        case 462: case 469:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.3);
            break;
        case 424:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.2);
            break;
        case 431:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 0.4);
            break;
        // case 16~27, 42~72, 81~83 ...which are not mentioned,
        // use default settings
        default:
            renderFXDefault(fxShaderEnum[fxnum], fxSouceEnum[fxnum], 1.0);
    }
    uiAppendLog("Render FX_" + fxnum + " Complete!");
}

function renderGLWithFrameNumber(frameIndex)
{
    clearInterval(g_timeInterval);
    currentEffect = frameIndex;
    effectKind = 2;
    
    switch(frameDefEnum[frameIndex].charAt(0))
    {
    case 'S': case 's':
        renderFrameS(frameIndex, 0);
        break;
    case 'M': case 'm':
        if(!bUseNewFrameM)
            renderFrameM(frameIndex, 0.2);
        else renderFrameNewM(frameIndex, 0.1);
        break;
    default:
        ;
    }
    uiAppendLog("Render Frame_" + frameIndex + " Complete!");
}

function renderGLWithCardNumber(cardIndex)
{
    clearInterval(g_timeInterval);
    currentEffect = cardIndex;
    effectKind = 3;
    renderFrameC(cardIndex);
    uiAppendLog("Render Card_" + cardIndex + " Complete!");
}













