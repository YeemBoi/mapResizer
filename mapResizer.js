var mappedImages = maps = ocs = natWidths = widths = areas = [];
var mapI = 0;
var i, j;

window.onload = function()
{
	var allImages = document.getElementsByTagName("IMG");
	for (i=0; i<allImages.length; i++)
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
				for (j=0; j<areas[mapI].length; j++)
					ocs[mapI].push(areas[mapI][j].coords.split(",").map(Number)); // the OTHER kind of map
				maps.push(cMap);
				mapI++;
			}
		}
	}
	redoMaps();
};
window.onresize = function() {redoMaps()};

function redoMaps()
{
	for (i=0; i<mapI; i++)
	{
		for (j=0; j<areas[i].length; j++)
			areas[i][j].coords = ocs[i][j].map(x => x / natWidths[i] * widths[i]).join();
	}
}
