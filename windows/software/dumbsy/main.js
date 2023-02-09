const leftPane = document.getElementById('leftpane');
const rightPane = document.getElementById('rightpane');
const ItemType = 
{
    Sword:'Sword',
    Shield:'Shield',
    Gun:'Gun',
    Helmet:'Helmet',
    Chestplate:'Chestplate',
    Leggings:'Leggings',
    Boots:'Boots',
    Potion:'Potion',
    Food:'Food',
    Key:'Key',
    Scroll:'Scroll',
    Book:'Book',
    Gem:'Gem',
    Coin:'Coin',
    Gemstone:'Gemstone',
};

function setStatus(status) {
    document.getElementById('activity').innerHTML = status;
    document.title = "Dumbsy :: " + status;
}

function loadPane(pane,path)
{
    if(pane == 'left')
    {
    leftPane.innerHTML = path;
    }
    else if(pane == 'right')
    {
    rightPane.innerHTML = path;
    }
    else{console.log("no pane");}
}

function setup()
{
    Player.name = document.getElementById('username').value;
    Player.difficulty = document.getElementById('difficulty').value;

    let difColor = "";
    switch(Player.difficulty)
    {
        case 'Hard':
            difColor = "red";
            break;
        case 'Medium':
            difColor = "orange";
            break;
        case 'Easy':
            difColor = '#00FF00';
            break;
    }
    loadPane('left', 
    `
    <div class='top'>
    <b>${Player.name}</b> | <span style="color:${difColor}">${Player.difficulty}</span><br><br>
    <progress id="health" value="100" max="100"></progress>
    </div><hr>
    <div class="bottom">
    <table id="inventory">
    </table>
    </div>
    `)
    loadPane('right', ``);
    Player.inventory.push(new Item('Gun', 'A gun', 50, 500, ItemType.Gun));
    Player.inventory.push(new Item('Gun2', 'A gun', 50, 500, ItemType.Gun));
    selectItem(1);
    Player.populateInventory();
}

loadPane('right',
`
<h1>Dumbsy Setup</h1>
<br><br>
<form action="javascript:void(0);" onsubmit="setup();">
    <label for="username">Username:</label>
    <input type="text" id="username" placeholder="Name" maxlength="10" required>
    <label for="username">Difficulty:</label>
    <select id="difficulty">
        <option>Hard</option>
        <option>Normal</option>
        <option>Easy</option>
    </select><br><br>
    <input type="submit" value="Start">
</form>
`);

function selectItem(id)
{
    Player.currentItem = id;
}

class IDSYS
{
    static ids = [];
    static getID()
    {
        return this.ids.length;
    }
}

class Item
{
    constructor(name, description, weight, value, type)
    {
        this.name = name;
        this.description = description;
        this.weight = weight;
        this.value = value;
        this.type = type;
        this.ID = IDSYS.getID();
    }
}

class Player
{
    static name;
    static difficulty;
    static currentItem;
    static inventory = [];
    static maxInventorySize = 10;

    static populateInventory()
    {
        let table = document.getElementById('inventory');
        let inner = "<tr>";
        for(var i = 0; i < this.maxInventorySize; i++)
        {
            if(i%3==0)
            {
                inner += "</tr><tr>";
            }
            if(this.inventory[i] != undefined)
            {
                inner += `<td onclick="selectItem(${this.inventory[i].ID})">${this.inventory[i].name}</td>`;
            }
        }

        table.innerHTML = inner;
    }
}