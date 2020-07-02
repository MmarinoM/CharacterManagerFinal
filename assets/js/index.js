const axios = require('axios');
const regeneratorRuntime = require("regenerator-runtime");
let idCharacter = null;
let i = 0 ;

// TEST IMG
function readImage()
    {
        const imageSelectorInput = document.getElementById("imageSelector").files[0];
        const imagePreviewElement = document.getElementById("imagePreview");

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            imagePreviewElement.src = event.target.result;
        });

        reader.readAsDataURL(imageSelectorInput);
    }

    document.getElementById("imageSelector").addEventListener("change", () => {
      readImage();
  });
function readImageEDIT()
    {
        const imageSelectorInput = document.getElementById("imageSelectorEDIT").files[0];
        const imagePreviewElement = document.getElementById("imagePreviewEDIT");

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            imagePreviewElement.src = event.target.result;
        });

        reader.readAsDataURL(imageSelectorInput);
    }

    document.getElementById("imageSelector").addEventListener("change", () => {
      readImage();
  });
    document.getElementById("imageSelectorEDIT").addEventListener("change", () => {
      readImageEDIT();
  });

//


class Character {
    constructor (name, shortDescription, description,image) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.description = description;
        this.image = image;
    }
}




function createOneCharacter()
{
  const nameInput = document.getElementById("nameform").value;
  const shortDescriptionInput = document.getElementById("shortDescription").value;
  const descriptionInput = document.getElementById("descriptionform").value;
  const imgPreview = document.getElementById("imagePreview").src;
  let imageInput = "";

  if(imgPreview != window.location.href)
        {
            imageInput = imgPreview.substring(23, imgPreview.length);
            
        }
        else
        {
            imageInput = "";
        }

  console.log(nameInput);
  console.log(shortDescriptionInput);
  console.log(descriptionInput);
  console.log(imageInput);
  


  const newCharacter = new Character(nameInput, shortDescriptionInput, descriptionInput, imageInput);
  console.log(newCharacter);
  return newCharacter;
}

async function updateCharacter(characterUpdate) {
  try {

    return await axios.put("https://character-database.becode.xyz/characters" + "/" + characterUpdate.id, {
      id: characterUpdate.id,
      name: characterUpdate.name,
      shortDescription: characterUpdate.shortDescription,
      description: characterUpdate.description,
      image: characterUpdate.image
    });
  }
  catch (error)
  {
    console.error(error);
  }
  location.reload();
}

async function postCharacter(newCharacter) {
  try {

    return await axios.post("https://character-database.becode.xyz/characters", {
      name: newCharacter.name,
      shortDescription: newCharacter.shortDescription,
      description: newCharacter.description,
      image: newCharacter.image
    });
  }
  catch (error)
  {
    console.error(error);
  }
  
}

async function deleteCharacter(characterDelete) {
  try {

    return await axios.delete("https://character-database.becode.xyz/characters" + "/" + characterDelete);
    
    
  }
  catch (error)
  {
    console.error(error);
  }
  
}

async function displayList(){
    let api = await fetch("https://character-database.becode.xyz/characters");
    heroes = await api.json();
    console.log(heroes);
    const template = await document.querySelector("#template").content;
   heroes.forEach(element => {
       const clone = template.cloneNode(true);
        
       clone.querySelector("#name").innerHTML =  element.name;
       clone.querySelector("#description").innerHTML = element.shortDescription;
       if(element.image == undefined){

       }else{
        clone.querySelector(".img").src =  "data:image/jpeg;base64,"+element.image;
       }
       clone.querySelector(".viewButton").value =  i;
       clone.querySelector(".editButton").value =  i;
       clone.querySelector(".deleteItem").value =  element.id;
       i++
       document.querySelector("#target").appendChild(clone);
   });

   let buttonsView =  document.getElementsByClassName("viewButton");
   let buttonsEdit =  document.getElementsByClassName("editButton");
   let buttonsDelete = document.getElementsByClassName("deleteItem");

   for (let index = 0; index < buttonsView.length; index++) {
    //QUAND ON CLIQUE SUR VIEW
    buttonsView[index].addEventListener("click",function(){
        idCharacter = buttonsView[index].value;
        console.log(idCharacter);
        document.getElementById("deleteItems").style.display = "none";
        document.getElementById("deleteTEXT").style.display = "none";
        document.getElementById("reload").style.display = "block";
        document.getElementById("target").style.display = "none";
        document.getElementById("viewItem").style.display = "flex"; ///////////////
        console.log(heroes[idCharacter]);
        document.getElementById("titleItem").innerHTML = heroes[idCharacter].name;
        document.getElementById("miniDescription").innerHTML = heroes[idCharacter].shortDescription;
        document.getElementById("DescriptionItem").innerHTML = heroes[idCharacter].description;
        document.getElementById("imgITEM").src = "data:image/jpeg;base64,"+heroes[idCharacter].image;

        
        
    });
    // QUAND ON CLIQUE SUR EDIT
    buttonsEdit[index].addEventListener("click",function(){
        idCharacter = buttonsEdit[index].value;
        console.log(idCharacter);
        document.getElementById("deleteItems").style.display = "none";
        document.getElementById("deleteTEXT").style.display = "none";
        document.getElementById("reload").style.display = "block";
        document.getElementById("target").style.display = "none";
        document.getElementById("targetMODIF").style.display = "flex";
        document.getElementById("nameMODIF").value = heroes[idCharacter].name;
        document.getElementById("shortDescriptionMODIF").value = heroes[idCharacter].shortDescription;
        document.getElementById("descriptionMODIF").value = heroes[idCharacter].description;
        document.getElementById("descriptionMODIF").value = heroes[idCharacter].description;
        document.getElementById("imagePreviewEDIT").src = "data:image/jpeg;base64,"+heroes[idCharacter].image;
        

    })

    // QUAND ON CLIQUE SUR LA CROIX 
    buttonsDelete[index].addEventListener("click",function(){
        idCharacter = buttonsDelete[index].value;
        console.log(idCharacter);
        console.log("bonjour");
        var result = confirm ("Are you sure this character should be deleted ?");
        if (result==true) {
        deleteCharacter(idCharacter);
        setTimeout(window.location.reload.bind(window.location), 1500);
        
        }        
    });

    
};
   
   
} 

// QUAND ON CLIQUE SUR LE LOGO   " - "

document.getElementById("deleteItems").addEventListener("click",function(){
    let cross = document.getElementsByClassName("cross");
    console.log(cross);
    document.getElementById("deleteItems").style.display = "none";
    document.getElementById("deleteItemsClose").style.display = "block";
    for (let index = 0; index < cross.length; index++) {
        document.getElementsByClassName("cross")[index].style.display = "block";
        
    }
    
    
});

// QUAND JE CLIQUE SUR " - " QUAND IL EST ACTIVER

document.getElementById("deleteItemsClose").addEventListener("click", function(){
    let cross = document.getElementsByClassName("cross");
    document.getElementById("deleteItems").style.display = "block";
    document.getElementById("deleteItemsClose").style.display = "none";

    for (let index = 0; index < cross.length; index++) {
      document.getElementsByClassName("cross")[index].style.display = "none";
      
  }

});
// QUAND ON CLIQUE SUR LE LOGO "+"

document.getElementById("addItems").addEventListener("click",function(){
 document.getElementById("target").style.display = "none";
 document.getElementById("deleteItems").style.display = "none";
 document.getElementById("deleteTEXT").style.display = "none";
 document.getElementById("reload").style.display = "block";
 document.getElementById("form").style.display = "flex";
 document.getElementById("nameform").value = "";
 document.getElementById("shortDescription").value = "";
 document.getElementById("descriptionform").value = "";
 
});


// QUAND ON CLIQUE SUR RELOAD

document.getElementById("reload").addEventListener("click",function(){
    window.location.reload();
    // window.location.replace("index.html");
});

// QUAND ON CLIQUE SUR ENVOYER

document.getElementById("send").addEventListener("click",function(){
    
    postCharacter(createOneCharacter());
    setTimeout(window.location.reload.bind(window.location), 1000);
    
    
    
})    
// QUAND ON CLIQUE SUR ENVOYER dans MODIF

document.getElementById("sendMODIF").addEventListener("click",function(){
    heroes[idCharacter].name = document.getElementById("nameMODIF").value;
    heroes[idCharacter].shortDescription = document.getElementById("shortDescriptionMODIF").value;
    heroes[idCharacter].description = document.getElementById("descriptionMODIF").value;
    let img = document.getElementById("imagePreviewEDIT").src;
    heroes[idCharacter].image = img.substring(23, img.length);
    console.log(heroes);
    console.log("bonjour");
    updateCharacter(heroes[idCharacter]);
    setTimeout(window.location.reload.bind(window.location), 1000);
    
    
})    

// QUAND ON CLIQUE SUR DELETE CHARACTER DANS EDIT CHARACTER

document.getElementById("deleteEDIT").addEventListener("click",function(){
  
  var result = confirm ("Are you sure this character should be deleted ?");
  if (result==true) {
  deleteCharacter(heroes[idCharacter].id);
  setTimeout(window.location.reload.bind(window.location), 1000);
  
  } 
});



displayList();