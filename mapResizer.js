var mappedImages = [];
var maps = [];
var ocs = [];
var natWidths = [];
var areas = [];
var allImages;
var mapI = 0;
var i, j;

window.onload = function()
{
	allImages = document.getElementsByTagName("IMG");
	for (i=0; i<allImages.length; i++)
	{
		if (allImages[i].hasAttribute("USEMAP"))
		{
			var cMap = document.getElementsByName(allImages[i].useMap.slice(1))[0];
			if (cMap)
			{
				ocs.push([]);
				natWidths.push(allImages[i].naturalWidth);
				areas.push(cMap.getElementsByTagName("AREA"));
				for (j=0; j<areas[mapI].length; j++)
				{
				    ocs[mapI].push(areas[mapI][j].coords.split(",").map(Number)); // the OTHER kind of map
				}
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
			areas[i][j].coords = ocs[i][j].map(x => x / natWidths[i] * allImages[i].width).join();
	}
}
