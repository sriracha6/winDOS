window.onload = function()
{
    var c = new Window("AAAA",100,55,
    `./windows/software/TESTicles.html`,null,null, false);
}

$(document).ready(function(){
	$(document).bind('contextmenu', function(event){
		$("#contextmenu").css({"top": event.pageY + "px", "left": event.pageX + "px"}).show();
		event.preventDefault();
	});
	$(document).bind('click', function(){
		$("#contextmenu").hide();
	})
});

// &&&&&&&&&&&&&&&&&&&&
//     WINDOW FUNCS
// &&&&&&&&&&&&&&&&&&&&

//#region WindowFuncs
function minimizeWindow(id)
{
    $("#WINDOW-"+id).addClass("hidden");
}
function changeWindowCollapse(id)
{
    if(WindowManager.getWindow(id).collapsed)
    {
        $("#WINDOW-"+id).height(WindowManager.getWindow(id).previousHeight);
        $("#WINDOW-"+(id)+"-COLLAPSE").textContent = "v";
        WindowManager.getWindow(id).collapsed = false;    
    }
    else
    {
        $("#WINDOW-"+id).height("29px");
        $("#WINDOW-"+(id)+"-COLLAPSE").textContent = "^";
        WindowManager.getWindow(id).collapsed = true;
    }
}

function maximizeWindow(id)
{
    if(WindowManager.getWindow(id).maximized)
    {
        $("#WINDOW-"+id).height(WindowManager.getWindow(id).previousHeight+"px");
        $("#WINDOW-"+id).width(WindowManager.getWindow(id).previousWidth+"px");
        
        $("#WINDOW-"+id+"-MAXI").textContent = "[]";

        WindowManager.getWindow(id).maximized = false;
    }
    else
    {
        $("#WINDOW-"+id).position({x:0,y:0});
        $("#WINDOW-"+id).height("100%");
        $("#WINDOW-"+id).width("100%");

        $("#WINDOW-"+id+"-MAXI").textContent = "[]]";

        WindowManager.getWindow(id).maximized = true;
    }
}

function closeWindow(id)
{
    WindowManager.removeWindow(id);
    $("#WINDOW-"+id).remove();
    TaskbarManager.remove(id)
}

function updateWindowResize(id)
{
    WindowManager.getWindow(id).previousHeight = WindowManager.getWindow(id).height();
    WindowManager.getWindow(id).previousWidth = WindowManager.getWindow(id).width();
}

function openWindow(id)
{
    $("#WINDOW-"+id).removeClass("hidden");
}
//#endregion

