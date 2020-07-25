var aNames = [];

$(function() {
    resetInputs();
});

function disableCard(oDisableButton) {
    // Array deletion
    var sNameToBeDeleted = $(oDisableButton).parent().siblings('.babyname-text').text();
    aNames = aNames.filter(sName => sName !== sNameToBeDeleted);

    // Restyle button and card
    $(oDisableButton).attr('disabled', '');
    $(oDisableButton).parents(".card").addClass('card-disabled');
    
    // Order card below
    var oContainer = $("#cardCollection");
    var oCard = $(oDisableButton).parents(".card");
    oContainer.append(oCard);
}

function createCard(sName) {
    var sCardDesign = '<div class="card mb-2 card-style"><div class="card-body">';
    sCardDesign += '<p class="babyname-text">';
    sCardDesign += sName;
    sCardDesign += "<p>";
    sCardDesign += '<button type="button" class="btn btn-danger btn-right" ';
    sCardDesign += 'onclick="disableCard(this)">';
    sCardDesign += "Entfernen</button>";
    sCardDesign += "</div></div>";

    var oCard = $(sCardDesign);
    return oCard;
}

function getNameFromUI() {
    var oNameInput = $("#inputName");
    var sName = oNameInput.val();

    return sName;
}

function resetInputs() {
    var oNameInput = $("#inputName");
    oNameInput.val("");
    oNameInput.focus();
}

function clearCards() {
    var oContainer = $("#cardCollection");
    oContainer.empty();
}

function onAdd() {
    var sName = getNameFromUI();
    addName(sName);
    resetInputs();
}

function addName(sName) {
    if (!sName) {
        return;
    }
    aNames.push(sName);
    var oCard = createCard(sName);

    var oContainer = $("#cardCollection");
    oContainer.prepend(oCard);
}

function finishSelection() {
    $("#allInput").hide();
}

function saveNames() {
    localStorage.setItem("names", JSON.stringify(aNames));
    alert(aNames.length + " Namen gespeichert");
}

function loadNames() {
    aNames = [];
    clearCards();

    var storedNames = JSON.parse(localStorage.getItem("names"));

    for (var loadedIndex in storedNames) {
        addName(storedNames[loadedIndex]);
    }
}
