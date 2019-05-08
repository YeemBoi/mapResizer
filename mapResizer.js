var mappedImages = [];
var maps = [];
var ocs = [];
var natWidths = [];
var widths = [];
var areas = [];

window.onload = function()
{
	var allImages = document.getElementsByTagName("IMG");
	var mapInd = 0;
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
        for (j in areas[mapInd])
          ocs[mapInd].push(areas[mapInd].coords.split(","));
        mapInd++;
      }
	}
  redoMaps();
};
window.onresize = function(){redoMaps();};



function redoMaps(isFirstTime)
{
	for (var i=0; i<mappedImages.length; i++)
	{
		var cMap = document.getElementsByName(mappedImages[i].useMap.slice(1));
		if (cMap)
		{
			cMap = cMap[0];
			if (isFirstTime) 
			var coWidth = mappedImages[i].naturalWidth;
			var cwWidth = mappedImages[i].width;
			var cAreas = cMap.getElementsByTagName("AREA");
			for (var j=0; j<cAreas.length; j++)
			{
				var aCoords = cAreas[j].getAttribute("COORDS").split(",");
				if (isFirstTime) ocs[i].push([]);
				for (var k=0; k<aCoords.length; k++)
				{
					if (isFirstTime)
						ocs[i][j].push(aCoords[k]);
					aCoords[k] = (Number(ocs[i][j][k]) / coWidth) * cwWidth;
				}
				cAreas[j].setAttribute("COORDS", aCoords.join());
			}
		}
	}
}
