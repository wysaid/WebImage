WebImage
========

Introduction

WebImage is a GPU accelerated Image processing using WebGL.
You could see the results as soon as you press the key, that's cool isn't it?

Details

1. Static Filters

   WebImage provide many static filters like lomo, vignette, and a lot of texture-blend
   such as: hardLight, overLay, softLight, screen, linearLight, vividLight, multiply, exclude, colorBurn, darken, lighten,
            colorDodge, colorDodgeAdobe, LinearDodge, linearBurn, pinLight, hardMix, difference, add, etc.
            
2. Effects

   WebImage provide both dynamic and static effects, like wave, twirl, and so on.
   You can see the wave effect make the image act as dynamic waves, and it is not just a static image.
   
3. Coding

   WebImage uses a js-html framework that is build all by myself. I am a C++ programmer, so the framework may not be so professional.
   And the shader code is more useful. You can get it from my projects for free using.
   
4. Run

   You can easily see WebImage by visit: http://webimage.wysaid.org/
   
   WebImage could run on any browser that supports WebGL, such as chrome, firefox and the new opera.
   
   HOW TO RUN WebImage on your computer: start your local webserver (apache, iis, nginx...), put the whole project under the web root directory.
       Then open your browser(supporting WebGL), access the "index.html" like "http://localhost/WebImage/index.html"
   
   WebImage have to load the images. If you are running WebImage without a web server, the browser may throw a security exception.
   
   To solve the problem, (if you are using windows)you can open the 'index.html' in Microsoft Visual Studio, then right click the file window and click 'Open with browser'.
   The Microsoft Visual Studio could start the asp server to run WebImage.
   
   Or if you Only have a chrome, try to run chrome with arg "--allow-file-access-from-files", then directly open the "index.html"
   
   
