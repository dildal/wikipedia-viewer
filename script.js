const query = document.querySelector('.search');
const searchForm = document.querySelector('.search-bar');
const flexContainer = document.querySelector('.flex-container');


searchForm.addEventListener('submit', function(e){
	e.preventDefault();
	let searchFor = query.value;
	let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchFor}&origin=*`
	getArticles(url);
});


function getArticles(url) {
	fetch(url)
	.then(function(response){
		return response.json()
	})
	.then(function(json){
		let searched = json[0];
		let titles = json[1];
		let contents = json[2];
		let links = json[3];
		propogateSite(searched, titles, contents, links);
	});
}

function propogateSite(searched, titles, contents, links){
	let toRemove = document.querySelectorAll('.wiki-entry');
	if(toRemove.length != 0){
		toRemove.forEach(node => node.remove());
	}
	for(let i = 0; i < titles.length; i++){
		let wikiEntry = document.createElement('div');
		wikiEntry.classList.add('wiki-entry');
		let link = document.createElement('a');
		link.setAttribute('href', links[i]);
		link.setAttribute('target', '_blank');
		let wikiContent = document.createElement('div');
		wikiContent.classList.add('wiki-content');
		let wikiTitle = document.createElement('h4');
		wikiTitle.innerText = titles[i];
		wikiContent.appendChild(wikiTitle);
		let wikiBlurb = document.createElement('p');
		wikiBlurb.innerText = contents[i];
		wikiContent.appendChild(wikiBlurb);
		link.appendChild(wikiContent);
		wikiEntry.appendChild(link);
		flexContainer.appendChild(wikiEntry); 
	}
}

