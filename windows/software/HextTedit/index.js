var currentText = "";
var editBox = document.querySelector("#edit");

var keyWords = [{word:"tst",color:"red"}, {word:"cool",color:"red"}, {word:"A",color:"red"}];

function check()
{
    currentText = editBox.innerHTML;
    let newHTML = currentText;

    for(var i = 0; i < keyWords.length; i++)
    {
        newHTML = newHTML.replace(keyWords[i].word, "<span style='color:" + keyWords[i].color + "'>" + keyWords[i].word + "</span>");
    }

    editBox.innerHTML = newHTML;
}