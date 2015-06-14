

var helper = function() {
  this.colors = [
    /*
    {name:"black", value:0x000000},
    {name:"blue", value:0x0000ff},
    {name:"green", value:0x008000},
    {name:"orange", value:0xff4500},
    {name:"pink", value:0xff1444},
    {name:"purple", value:0xff00ff},
    {name:"red", value:0xff0000},
    {name:"white", value:0xffffff},
    {name:"yellow", value:0xffff00},
    */
    {name:"aliceblue", value:	0xF0F8FF}, {name:"antiquewhite", value:	0xFAEBD7},
    {name:"aqua", value:0x00FFFF}, {name:"aquamarine", value:	0x7FFFD4},
    {name:"azure", value:	0xF0FFFF}, {name:"beige", value:	0xF5F5DC},
    {name:"bisque", value:	0xFFE4C4}, {name:"black", value:	0x000000},
    {name:"blanchedalmond", value:	0xFFEBCD}, {name:"blue", value:	0x0000FF},
    {name:"blueviolet", value:	0x8A2BE2}, {name:"brown", value:	0xA52A2A},
    {name:"burlywood", value:	0xDEB887}, {name:"cadetblue", value:	0x5F9EA0},
    {name:"chartreuse", value:	0x7FFF00}, {name:"chocolate", value:	0xD2691E},
    {name:"coral", value:	0xFF7F50}, {name:"cornflowerblue", value:	0x6495ED},
    {name:"cornsilk", value:	0xFFF8DC}, {name:"crimson", value:	0xDC143C},
    {name:"cyan", value:	0x00FFFF}, {name:"darkblue", value:	0x00008B},
    {name:"darkcyan", value:	0x008B8B}, {name:"darkgoldenrod", value:	0xB8860B},
    {name:"darkgray", value:	0xA9A9A9}, {name:"darkgreen", value:	0x006400},
    {name:"darkkhaki", value:	0xBDB76B}, {name:"darkmagenta", value:	0x8B008B},
    {name:"darkolivegreen", value:	0x556B2F}, {name:"darkorange", value:	0xFF8C00},
    {name:"darkorchid", value:	0x9932CC}, {name:"darkred", value:	0x8B0000},
    {name:"darksalmon", value:	0xE9967A}, {name:"darkseagreen", value:	0x8FBC8F},
    {name:"darkslateblue", value:	0x483D8B}, {name:"darkslategray", value:	0x2F4F4F},
    {name:"darkturquoise", value:	0x00CED1}, {name:"darkviolet", value:	0x9400D3},
    {name:"deeppink", value:	0xFF1493}, {name:"deepskyblue", value:	0x00BFFF},
    {name:"dimgray", value:	0x696969}, {name:"dodgerblue", value:	0x1E90FF},
    {name:"firebrick", value:	0xB22222}, {name:"floralwhite", value:	0xFFFAF0},
    {name:"forestgreen", value:	0x228B22}, {name:"fuchsia", value:	0xFF00FF},
    {name:"gainsboro", value:	0xDCDCDC}, {name:"ghostwhite", value:	0xF8F8FF},
    {name:"gold",	value: 0xFFD700}, {name:"goldenrod", value:	0xDAA520},
    {name:"gray", value: 0x808080}, {name:"green", value:	0x008000},
    {name:"greenyellow", value:	0xADFF2F}, {name:"honeydew", value:	0xF0FFF0},
    {name:"hotpink", value:	0xFF69B4}, {name:"indianred", value:	0xCD5C5C},
    {name:"indigo", value:	0x4B0082}, {name:"ivory", value:	0xFFFFF0},
    {name:"khaki", value:	0xF0E68C}, {name:"lavender", value:	0xE6E6FA},
    {name:"lavenderblush", value:	0xFFF0F5}, {name:"lawngreen", value:	0x7CFC00},
    {name:"lemonchiffon", value:	0xFFFACD}, {name:"lightblue", value:	0xADD8E6},
    {name:"lightcoral", value:	0xF08080}, {name:"lightcyan", value:	0xE0FFFF},
    {name:"lightgoldenrodyellow", value:	0xFAFAD2}, {name:"lightgreen", value:	0x90EE90},
    {name:"lightgrey", value:	0xD3D3D3}, {name:"lightpink", value:	0xFFB6C1},
    {name:"lightsalmon", value:	0xFFA07A}, {name:"lightseagreen", value:	0x20B2AA},
    {name:"lightskyblue", value:	0x87CEFA}, {name:"lightslategray", value:	0x778899},
    {name:"lightsteelblue", value:	0xB0C4DE}, {name:"lightyellow", value:	0xFFFFE0},
    {name:"lime", value:	0x00FF00}, {name:"limegreen", value:	0x32CD32},
    {name:"linen", value:	0xFAF0E6}, {name:"magenta", value:	0xFF00FF},
    {name:"maroon", value:	0x800000}, {name:"mediumaquamarine", value:	0x66CDAA},
    {name:"mediumblue", value:	0x0000CD}, {name:"mediumorchid", value:	0xBA55D3},
    {name:"mediumpurple", value:	0x9370DB}, {name:"mediumseagreen", value:	0x3CB371},
    {name:"mediumslateblue", value:	0x7B68EE}, {name:"mediumspringgreen", value:	0x00FA9A},
    {name:"mediumturquoise", value:	0x48D1CC}, {name:"mediumvioletred", value:	0xC71585},
    {name:"midnightblue", value:	0x191970}, {name:"mintcream", value:	0xF5FFFA},
    {name:"mistyrose", value:	0xFFE4E1}, {name:"moccasin", value:	0xFFE4B5},
    {name:"navajowhite", value:	0xFFDEAD}, {name:"navy", value:	0x000080},
    {name:"oldlace", value:	0xFDF5E6}, {name:"olive", value:	0x808000},
    {name:"olivedrab", value:	0x6B8E23}, {name:"orange", value:	0xFFA500},
    {name:"orangered", value:	0xFF4500}, {name:"orchid", value:	0xDA70D6},
    {name:"palegoldenrod", value:	0xEEE8AA}, {name:"palegreen", value:	0x98FB98},
    {name:"paleturquoise", value:	0xAFEEEE}, {name:"palevioletred", value:	0xDB7093},
    {name:"papayawhip", value:	0xFFEFD5}, {name:"peachpuff", value:	0xFFDAB9},
    {name:"peru", value:	0xCD853F}, {name:"pink", value:	0xFFC0CB},
    {name:"plum", value:	0xDDA0DD}, {name:"powderblue", value:	0xB0E0E6},
    {name:"purple", value:	0x800080}, {name:"red", value:	0xFF0000},
    {name:"rosybrown", value:	0xBC8F8F}, {name:"royalblue", value:	0x4169E1},
    {name:"saddlebrown", value:	0x8B4513}, {name:"salmon", value:	0xFA8072},
    {name:"sandybrown", value:	0xF4A460}, {name:"seagreen", value:	0x2E8B57},
    {name:"seashell", value:	0xFFF5EE}, {name:"sienna", value:	0xA0522D},
    {name:"silver", value:	0xC0C0C0}, {name:"skyblue", value:	0x87CEEB},
    {name:"slateblue", value:	0x6A5ACD}, {name:"slategray", value:	0x708090},
    {name:"snow", value:	0xFFFAFA}, {name:"springgreen", value:	0x00FF7F},
    {name:"steelblue", value:	0x4682B4}, {name:"tan", value:	0xD2B48C},
    {name:"teal", value:	0x008080}, {name:"thistle", value:	0xD8BFD8},
    {name:"tomato", value:	0xFF6347}, {name:"turquoise", value:	0x40E0D0},
    {name:"violet", value:	0xEE82EE}, {name:"wheat", value:	0xF5DEB3},
    {name:"white", value:	0xFFFFFF}, {name:"whitesmoke", value:	0xF5F5F5},
    {name:"yellow", value:	0xFFFF00}, {name:"yellowgreen", value:	0x9ACD32}
  ];

  this.randomColor = function () {
    var index = Math.floor(Math.random()* this.colors.length);
    return this.colors[index].value;
  }

  this.colorByIndex = function (index) {
    return this.colors[index].value;
  }

  this.color = function (name) {
    return this.colors.filter(function(color){
        return color.name == name;
    })[0].value;
  }

};


module.exports = new helper();