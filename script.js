/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

 
//query






const renders = ({ data }) => {
  const { articles = [] } = data;
  //console.log(articles)
   
  //retrieves titles
  /*articles.forEach((items)=>{ 
    var filteredArticles =items.title
    console.log(filteredArticles);
    
  })*/
  document.getElementById('div').innerHTML=''
  //var urlArray = []
  //var context = []
  var resultsArray =[]
  articles.forEach((item)=>{
    //creates a new array without {} values
    const search = document.getElementById('searchTerm').value
    var slug = item.slug
    var title =item.title
  
    var filteredItems = item.sections.filter(value => Object.keys(value).length !== 0);
    
       //creates a merged array on body tags
       var resultObject = filteredItems.reduce(function(result, currentObject) {
        for(var key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
            result[key] = currentObject[key];
          }
        }
         
        return result;
        }, {});
        //converts results to string to match text
        var str = JSON.stringify(resultObject).replace(/(<([^>]+)>)/ig,"");
//         if (str.includes(search) ){
//           console.log('Match');
          
//           r.push("https://www.artsy.net/article/"+item.slug)
          
          
//           }
          
           var stringIndex = str.indexOf(search)
           if (stringIndex>0){
               context = str.substring(stringIndex-50,stringIndex+50)
               resultsArray.push({
               url:"https://www.artsy.net/article/"+item.slug,
               context:context.substr(Math.min(context.length, context.indexOf(" ")), Math.min(context.length, context.lastIndexOf(" "))),
               title: item.title

               
             })
             
           }
          });

//             });
          resultsArray.forEach((article)=>{
             //returns bullet point of title
             var title= document.createElement('LI')
             var articleTitle = document.createTextNode(article.title)
             title.appendChild(articleTitle)
             document.getElementById('div').appendChild(title)
            
            
             //returns bullet point of url
             var url = document.createElement('LI')
             var results = document.createElement("a");
             var urlContent = document.createTextNode(article.url)
             results.appendChild(urlContent)  
             results.href=article.url
             url.appendChild(results)
             document.getElementById('div').appendChild(url)

             //returns bullet point of context
             var text = document.createElement('LI')
             var textContent = document.createTextNode(article.context)
             text.appendChild(textContent)
             document.getElementById('div').appendChild(text)
             
             
             
             
             
          })

  
         if (resultsArray=== undefined || resultsArray.length ==0){
          document.getElementById('div').innerHTML= "No Matches"          
        }  
}

const button = document.getElementById('enter')

      function display(){
        document.getElementById('div').innerHTML= renders
      }
//const name = "andy-warhol"
const find =`{
  articles(published: true, channel_id: "5759e3efb5989e6f98f77993", limit: 100, offset: 0, featured: true, sort: "-published_at", omit: ["5c7fee78adb9e600182be117"], layout: "standard") {
    slug
    title
    
    sections {
      ... on Text {
        type
        body
      }
    }}}`

//api call func
const results = (ev)=> {
  
  //ev.preventDefault();
  //get search term from HTML input
  //const search = document.getElementById('searchTerm').value
  //console.log(search);
  
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: find
    })
  }; 
  
  fetch('https://writer.artsy.net/api/graphql',options)
    .then(response => response.json())
    .then(renders);
 
   
  };
