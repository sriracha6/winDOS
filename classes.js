class Window
{
    changeInteraction(event, ui, w)
    {
        if(w.hasClass("disabled"))
        {
            console.log("stop");
            w.removeClass("disabled");
        }
        else
        {
            console.log("start");
            w.addClass("disabled");
        }
    }
    constructor(title, sizex, sizey, body, positionx='50%', positiony='50%', isSystem=false) // TODO: objects
    {
        this.title = title;
        this.sizex = sizex;
        this.sizey = sizey;
        this.id = WindowManager.currentID;
        this.positionx = positionx;
        this.positiony = positiony;
        this.collapsed = false;
        this.previousHeight = sizey;
        WindowManager.notify(this);

        let bodyNEW = isSystem ? body :
         `<iframe src="${body}" style="width:100%;height:100%;border:0;margin:0;padding:0;"></iframe>`;

        let windowHTML = `
        <table class="window-bar" draggable="true">
            <tr>
            <td style="width:80%"><div class="window-title">${title}</div></td>
            <td style="width:5%"><button class="window-button" id="WINDOW-${this.id}-COLLAPSE" onclick="changeWindowCollapse(${this.id})">^</button></td>
            <td style="width:5%"><button class="window-button" onclick="minimizeWindow(${this.id})">-</button></td>
            <td style="width:5%"><button class="window-button" id="WINDOW-${this.id}-MAXI" onclick="maximizeWindow(${this.id})">[]</button></td>
            <td style="width:5%"><button class="window-button" onclick="closeWindow(${this.id})">X</button></td>
            </tr>
        </table>
        <div class="window-content" onresize="updateWindowResize(${this.id})">
            ${bodyNEW}
        </div>`;

        var w = document.getElementById("maincontent").appendChild(document.createElement("div"));
        w.className = "window";
        w.id = "WINDOW-"+this.id;
        w.innerHTML = windowHTML;
        w.style.zIndex = 1;
        $(w).find("table").mousedown(function(){
            $(w).draggable({disabled:false})
        });
        $(w).find("table").mouseup(function(){
            $(w).draggable({disabled:true, 
                start: function( event, ui ) {$(w).find("#maincontent").addClass("disabled");},
                stop: function(event, ui){$(w).find("#maincontent").removeClass("disabled");}})
        });
        $(w).mousedown(function(){$(w).css("zIndex",696)});
        $(w).mouseup(function(){$(w).css("zIndex",1);})

        /*$(".top-menu td").each(function(i, obj){
            obj.onclick = function(){
                // make all submenus of this element visible
                debugger;
                $(`#WINDOW-${this.id} .sub-menu`).each(function(i2, obj2){
                    console.log(i2);
                    obj2.removeClass('hidden');
                });
            };
        }
        );*/

        //$(w).mouseenter(function(){$(w).addClass('window-bar-active')})
        //$(w).mouseexit(function(){$(w).removeClass('window-bar-active')})

        $(function() {
            $('details').on('mouseover', function() {
              $(this).attr('open', true);
            }).on('mouseout', function() {
              $(this).attr('open', false);
            })
          });
       
    
        TaskbarManager.add(this.id);
    }
}

class MsgBox
{
    constructor(title, description, buttons={}) // messagebox
    {
        this.title = title;
        this.id = WindowManager.currentID;

        let buttonHTML = "";

        if(Object.keys(buttons).length > 0)
        {
        for(let [key, value] of Object.entries(buttons))
        {
            console.log(key);
            buttonHTML += `
            <button onclick='${value.func}'>${value.text}</button>
            `;
        }
        }
        else
        {
            buttonHTML += `<button onclick="closeWindow(${this.id})">OK</button>`;
        }

        let windowHTML = `
        <table class="window-bar" draggable="true">
            <tr>
            <td style="width:95%"><div class="window-title">${title}</div></td>
            <td style="width:5%"><button class="window-button" onclick="closeWindow(${this.id})">X</button></td>
            </tr>
        </table>
        <div class="window-content" onresize="updateWindowResize(${this.id})">
            <br>
            <div style='text-align:center;'>${description}</div>
            <br><br><br>
            <div class="button-list">
                ${buttonHTML}
            </div>
        </div>`;

        var w = document.getElementById("maincontent").appendChild(document.createElement("div"));
        w.className = "window";
        w.id = "WINDOW-"+this.id;
        w.innerHTML = windowHTML;
        w.style.zIndex = 1;
        w.style.width = "250px";
        $(w).find("table").mousedown(function(){
            $(w).draggable({disabled:false})
        });
        $(w).find("table").mouseup(function(){
            $(w).draggable({disabled:true})
        });
        $(w).mousedown(function(){$(w).css("zIndex",696)});
        $(w).mouseup(function(){$(w).css("zIndex",1);})

        $(w).addClass('non-resizable');
    }
}

class WindowManager
{
    static currentID = 0;
    static windows = [];

    static getWindow(id)
    {
        return this.windows.filter(x=>x.id==id)[0];
    }

    static removeWindow(id)
    {
        let w = WindowManager.getWindow(id);
        this.windows = this.windows.filter(x=>x!=w);
    }

    static notify(window)
    {
        this.windows.push(window);
        this.currentID++;
    }
}

class TaskbarManager
{
    static remove(id)
    {
        $("#TASKBAR-"+id).remove();
    }
    static add(id)
    {
        let w = WindowManager.getWindow(id);

        let buttonHTML = `
        <table><tr>
            <td>
                <img src="./img/start.png" style="width:32px;height:32px;"></img>
            </td>
            <td>${w.title}</td>
        </tr></table>
        `;

        var c = document.getElementById("everythingElseTaskbar")
            .appendChild(document.createElement("button"));
        c.className = "taskbarBtn";
        c.id = "TASKBAR-"+id;
        c.onclick = function(){openWindow(id)};
        c.innerHTML = buttonHTML;

        /*$(".taskbarBtn").each(function(i, obj){
            if(!($(obj[i]).attr('id') == "startButton"))
                $(obj[i]).css("width",100/(7+$("#taskbar").children().length)+"%");
        })*/
    }
}