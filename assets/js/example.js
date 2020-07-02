async function getCharacter(characterID) {
	try {
		return await axios.get("https://character-database.becode.xyz/characters" + "/" + characterID);
	}
	catch (error) {
		console.error(error);
	}
}





async function postCharacter(newCharacter) {
	try {

		return await axios.post("https://character-database.becode.xyz/characters", {
			name: newCharacter.name,
			shortDescription: newCharacter.shortDescription,
			description: newCharacter.description
		});
	}
	catch (error)
	{
		console.error(error);
	}
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







function createOneCharacter()
{
	const nameInput = document.getElementById("name").value;
	const shortDescriptionInput = document.getElementById("shortDescription").value;
	const descriptionInput = document.getElementById("description").value;

	console.log(nameInput);
	console.log(shortDescriptionInput);
	console.log(descriptionInput);


	const newCharacter = new Character(nameInput, shortDescriptionInput, descriptionInput);

	return newCharacter;
}


