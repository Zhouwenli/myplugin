先来说说仿写这个插件的初衷吧，在学习JavaScript再把它实用到项目中去，很多时候我们用的是前辈的插件
在修改样式以及功能的时候也是耗时耗力，所以想写一个属于自己的插件，因为我也是刚入前端不久，希望和大家一起学习。
这个插件是仿写ydui，大家可以参考ydui Api进行学习，也可以和我一起摸索

1. !function(window){}(window);
这是一个自执行函数，相当于(function(window)(){})(window);

2.在自执行第一行使用"use strict";
很多人不知道加这个有什么用，但是就对于我们这样的小白来说，可以帮我们排查一些bug，语法兼容问题。

3.var dialog= window.dialog=window.dialog ||{};
这样做的目的是为了在调用插件的时候，能在外部可以访问到dialog

