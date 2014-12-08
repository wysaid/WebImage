/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/

var bUseNewFrameM = true;

var effectsEnum =
[
"default-fsh",
"wave-h",
"wave-v",
"wave-h-v",
"avg-black-white",
"weighted-black-white",
"two-value-black-white",    
"negative-black-white",
"negative-image",
"avg-emboss",
"avg-blur-0.5",
"avg-blur-1.0",
"avg-detail-alpha",
"avg-detail-beta",
"avg-detail-gama",    
"avg-edge-alpha",
"avg-edge-beta",
"avg-edge-gama",
"avg-only-edge",
"avg-glass-alpha",
"avg-glass-beta",
"avg-glass-gama",
"tilt-shift-vector",
"tilt-shift-circle",
"tilt-shift",
"motion-ball",
"testing-functions"
];

var fxSouceEnum = 
[
"@ table e0_c1",//0 (old: 1)                   YB
"@ table e1_c1",//1 ..
"@ table e2_c1",//2 ..
"@ table e3_c1",//3 ..
"@ table e4_c1",//4 (old: 5)


"@ table e5_c1",//5 (old: 6)
"@ table e6_c1",//6 (old: 7)
"@ table e7_c1",//7 (old: 24)
"@ table e8_c1",//8 (old: 25)
"@ table e9_c1",//9 (old: 26)
"@ table e10_c1",//10 (old: 82)
"@ table e11_c1",//11 (old: 87)
"@ table e12_c1",//12 (old: 83)
"@ table e13_c1",//13 (old: 88)
"@ table e14_c1",//14 (old: 89)
"@ table e15_c1",//15 (old: 92)             YE


"",//16 (old: 19)               CB
"",//17 ..
"",//18 ..
"",//19 ..
"",//20 (old: 23)

"",//21 (old: 77)
"@ table e22_c1",//22 ..
"@ table e23_c1",//23 ..
"@ table e24_c1",//24 ..
"@ table e25_c1",//25 (old: 81)
"@ table e26_c1",//26 (old: 86)
"",//27 (old: 91)

"",//28 (old: 40)
"",//29 ..
"",//30 ..
"",//31 ..
"",//32 (old: 44)

"@ texture e33_t",//33 (old: 64)
"@ texture e34_t",//34 ..
"@ texture e35_t",//35 ..
"@ texture e36_t",//36 ..
"@ texture e37_t",//37 ..
"@ texture e38_t",//38 (old: 69)
"@ texture e39_t",//39
"@ texture e40_t",//40 (old: 70)
"@ texture e41_t",//41 (old: 71)

"@ texture e42_t",//42
"@ texture e43_t",//43
"@ texture e44_t",//44
"@ texture e45_t",//45
"@ texture e46_t",//46
"@ texture e47_t",//47
"@ texture e48_t",//48
"@ texture e49_t",//49
"@ texture e50_t",//50
"@ texture e51_t",//51
"@ texture e52_t",//52
"@ texture e53_t",//53
"@ texture e54_t",//54
"@ texture e55_t",//55
"@ texture e56_t",//56
"@ texture e57_t",//57
"@ texture e58_t",//58
"@ texture e59_t",//59
"@ texture e60_t",//60
"@ texture e61_t",//61
"@ texture e62_t",//62
"@ texture e63_t",//63
"@ texture e64_t",//64
"@ texture e65_t",//65
"@ texture e66_t",//66
"@ texture e67_t",//67
"@ texture e68_t",//68
"@ texture e69_t",//69
"@ texture e70_t",//70
"@ texture e71_t",//71
"@ texture e72_t",//72


"@ table e73_c1 @ table e73_c2 @ texture vtg", //73
"@ table e74_c1 @ table e74_c2 @ texture vtg", //74
"@ table e75_c1 @ table e75_c2 @ texture vtg", //75
"@ table e76_c1 @ table e76_c2 @ texture vtg", //76
"@ table e77_c1 @ table e77_c2 @ texture vtg", //77
"@ table e78_c1 @ table e78_c2 @ texture vtg", //78
"@ table e79_c1 @ table e79_c2 @ texture vtg", //79
"@ table e80_c1 @ table e80_c2 @ texture vtg", //80

"@ texture e81_t",//81 (old: 45)
"@ texture e82_t",//82 (old: 46)

"@ texture Muti_texture1-1 @ texture Muti_texture1-2 @ texture Muti_texture1-3",//83
"@ texture Muti_texture2-1 @ texture Muti_texture2-2",//84
"@ texture Muti_texture4-1 @ texture Muti_texture4-2 @ texture Muti_texture4-3",//85
"@ texture Muti_texture5-1 @ texture Muti_texture5-2 @ texture Muti_texture5-3 @ texture Muti_texture5-4 @ texture Muti_texture5-5",//86

"",//87 (old: 29)
"",//88 (old: 30)
"",//89 (old: 31)
"",//90 (old: 32)
"",//91 (old: 36)
"",//92 (old: 33)
"@ table e93_c1",//93 (old: 37)
"@ table e94_c1",//94 (old: 38)
"",//95 (old: 27)
"",//96 (old: 35)
"",//97 (old: 28)
"",//98 (old: 39)
"",//99 (old: 34)
"@ table e100_c1 @ texture vtg",//100
"@ table e101_c1 @ texture Texturize2_32",//101

"@ table e102_c1",//102
"@ table e103_c1",//103
"",//104
"@ table e105_c1",//105
"@ table e106_c1",//106
"@ table e107_c1",//107
"@ table e108_c1",//108
"@ table e109_c1",//109
"@ table e110_c1",//110

"",//111
"",//112
"@ texture e113_t",//113
"@ texture e114_t",//114
"@ texture e115_t",//115
"@ texture e116_t",//116
"@ table e117_c1",//117     YYYYYYYYYYY
"",//118 (old:17)
"@ table e119_c1",//119
"@ table e120_c1",//120
"@ table e121_c1 @ table e121_c2 @ texture Glimmer_1 @ texture Glimmer_2 @ texture Glimmer_Gina",//121
"@ table e122_c1 @ table e122_c2 @ table e122_c3 @ texture Glimmer_1 @ texture Glimmer_2",//122
"@ table e123_c1 @ table e123_c2 @ texture Kailani_1",//123
"@ table e124_c1 @ table e124_c2 @ table e124_c3 @ texture Kailani_1",//124
"@ table e125_c1 @ table e125_c2 @ table e125_c3 @ texture Kailani_1 @ texture Kailani_Slide",//125
"@ table e126_c1 @ texture Beattle @ texture Beattle_blank",//126

"@ table e127_c1 @ table e127_c2 @ texture Beattle @ texture Beattle_Gina",//127
"@ table e128_c1 @ table e128_c2 @ texture Glimmer_1 @ texture Glimmer_2 @ texture Glimmer_Slide",//128
"@ table e129_c1 @ table e129_c2 @ table e129_c3 @ texture Glimmer_1 @ texture Glimmer_2 @ texture Glimmer_Freddie",//129
"@ table e130_c1 @ table e130_c2 @ texture Beattle @ texture Beattle_blaky1 @ texture Beattle_blaky2",//130

"@ table e131_c1 @ table e131_c2 @ texture Kailani_1 @ texture Kailani_Monochrome",//131
"@ table e132_c1 @ table e132_c2 @ texture Johnny_1 @ texture Johnny_2",//132
"@ table e133_c1 @ table e133_c2 @ texture Johnny_1 @ texture Johnny_2",//133
"@ table e134_c1 @ table e134_c2 @ table e134_c3 @ texture Johnny_1 @ texture Johnny_2 @ texture Johnny_Monochrome",//134
"@ table e135_c1 @ table e135_c2 @ table e135_c3 @ texture Beattle @ texture Beattle_Floaty",//135
"@ table e136_c1 @ table e136_c2 @ table e136_c3 @ texture Beattle @ texture Beattle_Monochrome1 @ texture Beattle_Monochrome2",//136 
"@ table e137_c1 @ table e137_c2 @ table e137_c3 @ texture Kailani_1",//137
];

var fxShaderEnum = 
[
"lomo_FragmentShaderString",  //0
"lomo_FragmentShaderString",  //1
"lomo_FragmentShaderString",  //2
"lomo_FragmentShaderString",  //3
"lomo_FragmentShaderString",  //4
"lomo2_FragmentShaderString", //5
"lomo2_FragmentShaderString", //6
"lomo2_FragmentShaderString", //7
"lomo2_FragmentShaderString", //8
"lomo2_FragmentShaderString", //9
"lomo2_FragmentShaderString", //10
"lomo2_FragmentShaderString", //11
"lomo2_FragmentShaderString", //12
"lomo2_FragmentShaderString", //13
"lomo2_FragmentShaderString", //14
"lomo2_FragmentShaderString", //15

"color_e16_FragmentShaderString", //16
"color_e17_FragmentShaderString", //17
"color_e18_FragmentShaderString", //18
"color_e19_FragmentShaderString", //19
"color_e20_FragmentShaderString", //20
"color2_e21_FragmentShaderString", //21
"color2_e22_FragmentShaderString", //22
"color2_e23_FragmentShaderString", //23
"color2_e24_FragmentShaderString", //24
"color2_e25_FragmentShaderString", //25
"color2_e26_FragmentShaderString", //26
"color2_e27_FragmentShaderString", //27

"bw_e28_FragmentShaderString",    //28
"bw_e29_FragmentShaderString",    //29
"bw_e30_FragmentShaderString",    //30
"bw_e30_FragmentShaderString",    //31
"bw_e30_FragmentShaderString",    //32
"texture_e33_FragmentShaderString",   //33
"texture_e34_FragmentShaderString",   //34
"texture_e35_FragmentShaderString",   //35
"texture_e36_FragmentShaderString",   //36
"texture_e37_FragmentShaderString",   //37
"texture_e38_FragmentShaderString",   //38
"texture_e39_FragmentShaderString",   //39
"texture_e40_FragmentShaderString",   //40

"texture_e41_FragmentShaderString",   //41
"texture_e42_FragmentShaderString",   //42
"texture_e43_FragmentShaderString",   //43
"texture_e44_FragmentShaderString",   //44
"texture_e45_FragmentShaderString",   //45
"texture_e46_FragmentShaderString",   //46
"texture_e47_FragmentShaderString",   //47
"texture_e48_FragmentShaderString",   //48
"texture_e49_FragmentShaderString",   //49
"texture_e50_FragmentShaderString",   //50
"texture_e51_FragmentShaderString",   //51
"texture_e52_FragmentShaderString",   //52
"texture_e53_FragmentShaderString",   //53
"texture_e54_FragmentShaderString",   //54
"texture_e55_FragmentShaderString",   //55
"texture_e56_FragmentShaderString",   //56
"texture_e57_FragmentShaderString",   //57
"texture_e58_FragmentShaderString",   //58
"texture_e59_FragmentShaderString",   //59
"texture_e60_FragmentShaderString",   //60
"texture_e61_FragmentShaderString",   //61
"texture_e62_FragmentShaderString",   //62
"texture_e63_FragmentShaderString",   //63
"texture_e64_FragmentShaderString",   //64
"texture_e65_FragmentShaderString",   //65
"texture_e66_FragmentShaderString",   //66
"texture_e67_FragmentShaderString",   //67
"texture_e68_FragmentShaderString",   //68
"texture_e69_FragmentShaderString",   //69
"texture_e70_FragmentShaderString",   //70
"texture_e71_FragmentShaderString",   //71
"texture_e72_FragmentShaderString",   //72

"Effect_texture_toaster_FragemntShaderString",      //73
"Effect_texture_earlybird_FragmentShaderString",      //74
"texture2_FragmentShaderString",      //75
"Effect_texture_brannan_FragmentShaderString",      //76
"texture2_FragmentShaderString",      //77
"texture2_FragmentShaderString",      //78
"Effect_texture_apolloX_FragmentShaderString",      //79
"texture2_FragmentShaderString",      //80

"bw_e81_FragmentShaderString",        //81
"bw_e81_FragmentShaderString",        //82

"Multi_Texture83_FragmentShaderString",   //83
"Multi_Texture84_FragmentShaderString",   //84
"Multi_Texture85_FragmentShaderString",   //85
"Multi_Texture86_FragmentShaderString",   //86

"ColorEffect_e87_FragmentShaderString",   //87  technicolor3
"ColorEffect_e88_FragmentShaderString",   //88  emboss with color, 
"ColorEffect_e89_FragmentShaderString",   //89  emboss without color, 
"ColorEffect_e90_FragmentShaderString",   //90  color_gradient with color_by, 
"ColorEffect_e91_FragmentShaderString",   //91  technicolor1 & vigetAmount & vigetMidPointValue
"ColorEffect_e92_FragmentShaderString",   //92  
"lomo_FragmentShaderString",   //93
"lomo_FragmentShaderString",   //94
"ColorEffect_e95_FragmentShaderString",   //95
"ColorEffect_e96_FragmentShaderString",   //96
"ColorEffect_e97_FragmentShaderString",   //97
"ColorEffect_e98_FragmentShaderString",   //98
"ColorEffect_e99_FragmentShaderString",   //99

"Effect100_Fragment_ShaderString",   //100
"Effect101_Fragment_ShaderString",   //101

"lomo2_FragmentShaderString",     //102
"lomo2_FragmentShaderString",     //103

"Effect104_Fragment_ShaderString",    //104
"lomo_FragmentShaderString",    //105
"lomo_FragmentShaderString",    //106
"lomo_FragmentShaderString",    //107
"lomo_FragmentShaderString",    //108
"lomo_FragmentShaderString",    //109
"lomo_FragmentShaderString",    //110
"bw_e111_FragmentShaderString", //111
"vignette_bw_FragmentShaderString",   //112
"texture_e113_FragmentShaderString",  //113
"texture_e114_FragmentShaderString",  //114
"texture_e115_FragmentShaderString",  //115
"texture_e116_FragmentShaderString",  //116
"lomo2_FragmentShaderString",     //117
"vignette_e118_FragmentShaderString", //118
"Effect_baw_Fragment_ShaderString",   //119
"Effect_baw_Fragment_ShaderString",   //120

"Effect_glimer_gina_Fragment_ShaderString",   //121
"Effect_glimer_kodat_Fragment_ShaderString",  //122
"Effect_kailani_blank_Fragment_ShaderString", //123
"Effect_kailani_kodak_Fragment_ShaderString", //124
"Effect_kailani_slide_Fragment_ShaderString", //125
"Effect_beattle_blank_Fragment_ShaderString", //126
"Effect_beattle_gina_Fragment_ShaderString",  //127
"Effect_glimer_slide_Fragment_ShaderString",  //128
"Effect_glimer_freddie_Fragment_ShaderString",    //129 
"Effect_beattle_blaky_Fragment_ShaderString", //130
"Effect_kailani_monochrome_Fragment_ShaderString", //131
"Effect_johnny_blacky_Fragment_ShaderString",     //132
"Effect_johnny_blank_Fragment_ShaderString",      //133
"Effect_johnny_monochrome_Fragment_ShaderString",  //134
"Effect_beattle_floaty_Fragment_ShaderString",        //135
"Effect_beattle_monochrome_Fragment_ShaderString",    //136
"Effect_kailani_floaty_Fragment_ShaderString",        //137
];

var fxNum = fxShaderEnum.length;

var frameDefEnum =
[
"", //0
"M 231 231 @ 1M_0 0 0 115 115 @ 1M_1 115 0 1 115 @ 1M_2 116 0 115 115 @ 1M_3 116 115 115 1 @ 1M_4 116 116 115 115 @ 1M_5 115 116 1 115 @ 1M_6 0 116 115 115 @ 1M_7 0 115 115 1 ", //1
"M 133 133 @ 2M_0 0 0 66 66 @ 2M_1 66 0 1 66 @ 2M_2 67 0 66 66 @ 2M_3 67 66 66 1 @ 2M_4 67 67 66 66 @ 2M_5 66 67 1 66 @ 2M_6 0 67 66 66 @ 2M_7 0 66 66 1 ", //2
"M 161 161 @ 3M_0 0 0 80 80 @ 3M_1 80 0 1 80 @ 3M_2 81 0 80 80 @ 3M_3 81 80 80 1 @ 3M_4 81 81 80 80 @ 3M_5 80 81 1 80 @ 3M_6 0 81 80 80 @ 3M_7 0 80 80 1 ", //3
"M 212 212 @ 4M_0 0 0 82 82 @ 4M_1 82 0 48 82 @ 4M_2 130 0 82 82 @ 4M_3 130 82 82 48 @ 4M_4 130 130 82 82 @ 4M_5 82 130 48 82 @ 4M_6 0 130 82 82 @ 4M_7 0 82 82 48 ", //4
"M 212 212 @ 5M_0 0 0 82 82 @ 5M_1 82 0 48 82 @ 5M_2 130 0 82 82 @ 5M_3 130 82 82 48 @ 5M_4 130 130 82 82 @ 5M_5 82 130 48 82 @ 5M_6 0 130 82 82 @ 5M_7 0 82 82 48 ", //5
"M 229 229 @ 6M_0 0 0 93 93 @ 6M_1 93 0 43 93 @ 6M_2 136 0 93 93 @ 6M_3 136 93 93 43 @ 6M_4 136 136 93 93 @ 6M_5 93 136 43 93 @ 6M_6 0 136 93 93 @ 6M_7 0 93 93 43 ", //6
"M 264 264 @ 7M_0 0 0 112 112 @ 7M_1 112 0 40 112 @ 7M_2 152 0 112 112 @ 7M_3 152 112 112 40 @ 7M_4 152 152 112 112 @ 7M_5 112 152 40 112 @ 7M_6 0 152 112 112 @ 7M_7 0 112 112 40", //7
"S ", //8
"M 270 270 @ 9M_0 0 0 110 110 @ 9M_1 110 0 50 110 @ 9M_2 160 0 110 110 @ 9M_3 160 110 110 50 @ 9M_4 160 160 110 110 @ 9M_5 110 160 50 110 @ 9M_6 0 160 110 110 @ 9M_7 0 110 110 50 ", //9
"M 174 174 @ 10M_0 0 0 72 72 @ 10M_1 72 0 30 72 @ 10M_2 102 0 72 72 @ 10M_3 102 72 72 30 @ 10M_4 102 102 72 72 @ 10M_5 72 102 30 72 @ 10M_6 0 102 72 72 @ 10M_7 0 72 72 30 ", //10
"M 77 77 @ 11M_0 0 0 38 38 @ 11M_1 38 0 1 38 @ 11M_2 39 0 38 38 @ 11M_3 39 38 38 1 @ 11M_4 39 39 38 38 @ 11M_5 38 39 1 38 @ 11M_6 0 39 38 38 @ 11M_7 0 38 38 1 ", //11
"M 396 396 @ 12M_0 0 0 153 153 @ 12M_1 153 0 90 153 @ 12M_2 243 0 153 153 @ 12M_3 243 153 153 90 @ 12M_4 243 243 153 153 @ 12M_5 153 243 90 153 @ 12M_6 0 243 153 153 @ 12M_7 0 153 153 90 ", //12
"M 249 249 @ 13M_0 0 0 124 124 @ 13M_1 124 0 1 124 @ 13M_2 125 0 124 124 @ 13M_3 125 124 124 1 @ 13M_4 125 125 124 124 @ 13M_5 124 125 1 124 @ 13M_6 0 125 124 124 @ 13M_7 0 124 124 1 ", //13
"M 307 264 @ 14M_0 0 0 153 88 @ 14M_1 153 0 1 88 @ 14M_2 154 0 153 88 @ 14M_3 154 88 153 88 @ 14M_4 154 176 153 88 @ 14M_5 153 176 1 88 @ 14M_6 0 176 153 88 @ 14M_7 0 88 153 88 ", //14
"M 120 137 @ 15M_0 0 0 32 68 @ 15M_1 32 0 56 68 @ 15M_2 88 0 32 68 @ 15M_3 88 68 11 1 @ 15M_4 88 69 32 68 @ 15M_5 32 69 56 68 @ 15M_6 0 69 32 68 @ 15M_7 0 68 11 1 ", //15
"M 67 67 @ 16M_0 0 0 33 33 @ 16M_1 33 0 1 33 @ 16M_2 34 0 33 33 @ 16M_3 34 33 33 1 @ 16M_4 34 34 33 33 @ 16M_5 33 34 1 33 @ 16M_6 0 34 33 33 @ 16M_7 0 33 33 1 ", //16
"S ", //17
"S ", //18
"S ", //19
"S ", //20
"M 120 120 @ 21M_0 0 0 56 56 @ 21M_1 56 0 8 56 @ 21M_2 64 0 56 56 @ 21M_3 64 56 56 8 @ 21M_4 64 64 56 56 @ 21M_5 56 64 8 56 @ 21M_6 0 64 56 56 @ 21M_7 0 56 56 8 ", //21
"M 83 83 @ 22M_0 0 0 41 41 @ 22M_1 41 0 1 41 @ 22M_2 42 0 41 41 @ 22M_3 42 41 36 1 @ 22M_4 42 42 41 41 @ 22M_5 41 42 1 41 @ 22M_6 0 42 41 41 @ 22M_7 0 41 41 1 ", //22
"M 264 264 @ 23M_0 0 0 112 112 @ 23M_1 112 0 40 112 @ 23M_2 152 0 112 112 @ 23M_3 152 112 112 40 @ 23M_4 152 152 112 112 @ 23M_5 112 152 40 112 @ 23M_6 0 152 112 112 @ 23M_7 0 112 112 40 ", //23
"S ", //24
"S ", //25
"M 66 65 @ 26M_0 0 0 32 32 @ 26M_1 32 0 1 32 @ 26M_2 33 0 33 32 @ 26M_3 33 32 32 1 @ 26M_4 33 33 33 32 @ 26M_5 32 33 1 32 @ 26M_6 0 33 32 32 @ 26M_7 0 32 32 1 ", //26
"S ", //27
"M 66 65 @ 28M_0 0 0 32 32 @ 28M_1 32 0 1 32 @ 28M_2 33 0 33 32 @ 28M_3 33 32 32 1 @ 28M_4 33 33 33 32 @ 28M_5 32 33 1 32 @ 28M_6 0 33 32 32 @ 28M_7 0 32 32 1 ", //28
"M 186 186 @ 29M_0 0 0 88 88 @ 29M_1 88 0 10 88 @ 29M_2 98 0 88 88 @ 29M_3 98 88 88 10 @ 29M_4 98 98 88 88 @ 29M_5 88 98 10 88 @ 29M_6 0 98 88 88 @ 29M_7 0 88 88 10 ", //29
"S ", //30
"S ", //31
"S ", //32
"S ", //33
"S ", //34
"S ", //35
"M 728 728 @ 36M_0 0 0 360 360 @ 36M_1 360 0 8 360 @ 36M_2 368 0 360 360 @ 36M_3 368 360 360 8 @ 36M_4 368 368 360 360 @ 36M_5 360 368 8 360 @ 36M_6 0 368 360 360 @ 36M_7 0 360 360 8 ", //36
"S ", //37
"M 728 728 @ 38M_0 0 0 360 360 @ 38M_1 360 0 8 360 @ 38M_2 368 0 360 360 @ 38M_3 368 360 360 8 @ 38M_4 368 368 360 360 @ 38M_5 360 368 8 360 @ 38M_6 0 368 360 360 @ 38M_7 0 360 360 8 ", //38
"S ", //39
"S ", //40
"M 170 170 @ 41M_0 0 0 70 70 @ 41M_1 70 0 30 70 @ 41M_2 100 0 70 70 @ 41M_3 100 70 70 30 @ 41M_4 100 100 70 70 @ 41M_5 70 100 30 70 @ 41M_6 0 100 70 70 @ 41M_7 0 70 70 30 ", //41
"M 362 362 @ 42M_0 0 0 166 166 @ 42M_1 166 0 30 166 @ 42M_2 196 0 166 166 @ 42M_3 196 166 166 30 @ 42M_4 196 196 166 166 @ 42M_5 166 196 30 166 @ 42M_6 0 196 166 166 @ 42M_7 0 166 166 30 ", //42
"S ", //43
"S ", //44
"M 133 133 @ 45M_0 0 0 66 66 @ 45M_1 66 0 1 66 @ 45M_2 67 0 66 66 @ 45M_3 67 66 66 1 @ 45M_4 67 67 66 66 @ 45M_5 66 67 1 66 @ 45M_6 0 67 66 66 @ 45M_7 0 66 66 1 ", //45
"S ", //46
"S ", //47
"S ", //48
"S ", //49
"M 186 186 @ 50M_0 0 0 88 88 @ 50M_1 88 0 10 88 @ 50M_2 98 0 88 88 @ 50M_3 98 88 88 10 @ 50M_4 98 98 88 88 @ 50M_5 88 98 10 88 @ 50M_6 0 98 88 88 @ 50M_7 0 88 88 10 ", //50
"S ", //51
"S ", //52
"M 186 186 @ 53M_0 0 0 88 88 @ 53M_1 88 0 10 88 @ 53M_2 98 0 88 88 @ 53M_3 98 88 88 10 @ 53M_4 98 98 88 88 @ 53M_5 88 98 10 88 @ 53M_6 0 98 88 88 @ 53M_7 0 88 88 10 ", //53
"M 186 186 @ 54M_0 0 0 88 88 @ 54M_1 88 0 10 88 @ 54M_2 98 0 88 88 @ 54M_3 98 88 88 10 @ 54M_4 98 98 88 88 @ 54M_5 88 98 10 88 @ 54M_6 0 98 88 88 @ 54M_7 0 88 88 10 ", //54
"M 186 186 @ 55M_0 0 0 88 88 @ 55M_1 88 0 10 88 @ 55M_2 98 0 88 88 @ 55M_3 98 88 88 10 @ 55M_4 98 98 88 88 @ 55M_5 88 98 10 88 @ 55M_6 0 98 88 88 @ 55M_7 0 88 88 10 ", //55
];

var frameNum = frameDefEnum.length;

var sourcePicEnum = 
[
"Resource/girl.jpg",
"Resource/kanade.jpg",
"Resource/AngelBeats.jpg",
"Resource/house.jpg",
"Resource/dish.jpg",
"Resource/godness.jpg",
"Resource/woman.jpg",
"Resource/woman2.jpg",
"Resource/xiada.jpg",
"Resource/boy.jpg",
"Resource/mountain.jpg",
"Resource/sky.jpg",
"Resource/flower1.jpg",
"Resource/flower2.jpg",
"Resource/ballon.jpg",
"Resource/oldmotorcycle.jpg",
"Resource/newmotorcycle.jpg",
"Resource/dandelion.jpg",
"Resource/pipeXgrass.jpg",
"Resource/rose.jpg",
"Resource/new1.jpg",
"Resource/new2.jpg",
"Resource/new3.jpg",
"Resource/new4.jpg",
];


