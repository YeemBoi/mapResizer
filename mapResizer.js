var mappedImages = [];
var maps = [];
var ocs = [];
var natWidths = [];
var widths = [];
var areas = [];
var mapInd = 0;

window.onload = function ()
{
	var allImages = document.getElementsByTagName("IMG");
	for (i = 0; i < allImages.length; i++)
	{
		if (allImages[i].hasAttribute("USEMAP"))
		{
			var cMap = document.getElementsByName(allImages[i].useMap.slice(1));
			if (cMap)
			{
				cMap = cMap[0];
				ocs.push([]);
				natWidths.push(allImages[i].naturalWidth);
				widths.push(allImages[i].width);
				areas.push(cMap.getElementsByTagName("AREA"));
				for (var j=0; j<areas[mapInd].length; j++)
					ocs[mapInd].push(areas[mapInd][j].coords.split(",").map(Number)); // the OTHER kind of map
				maps.push(cMap);
				mapInd++;
			}
		}
		redoMaps();
	}
};
window.onresize = function ()
{
	redoMaps();
};

function redoMaps()
{
	for (var i=0; i<mapInd; i++)
	{
		for (var j=0; j<areas[i].length; j++)
			areas[i][j].coords = ocs[i][j].map(x => x / natWidths[i] * widths[i]).join();
	}
}
