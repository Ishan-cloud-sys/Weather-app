const input=document.querySelector(".input");
const cityinput=document.querySelector(".cityinput");
const displays=document.querySelector(".displays");
const api ="ce731a278740266fb02170c5880ae8bf";
input.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityinput.value;
    if(city){
        try{
            const data= await getweatherdata(city);//this await
            displayweather(data);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter a city");
    }

});
async function getweatherdata(city){
    const apiurl=(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`);
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new Error("Please eneter a valid city");
    }
    else {
        return await response.json();//this await corresponds to 
    }
}
function displayweather(info){
    console.log(info);
    const {name: city, main:{temp,humidity},weather:[{description,id}]}=info;//object and array destructuring
    displays.textContent="";
    displays.style.display="flex";
    const displaycity=document.createElement("h1");
    displaycity.textContent=`${city}`;
    displaycity.classList.add("city");
    displays.appendChild(displaycity);
        const displaytemp=document.createElement("p");
    displaytemp.textContent=`${((temp-273.15)*9/5+32).toFixed(2)}°F`;
    displaytemp.classList.add("temp");
    displays.appendChild(displaytemp);
        const displayhumidity=document.createElement("p");
    displayhumidity.textContent=`Humidity: ${humidity}%`;
    displayhumidity.classList.add("humidity");
    displays.appendChild(displayhumidity);
        const displaydesc=document.createElement("p");
    displaydesc.textContent=`Description: ${description}`;
    displaydesc.classList.add("desc");
    displays.appendChild(displaydesc);
        const displayemoji=document.createElement("p");
    displayemoji.textContent=getweatheremoji(id);
    displayemoji.classList.add("emoji");
    displays.appendChild(displayemoji);

}
function getweatheremoji(id){
    switch(true){
        case (id>=200 && id<300):
            return "⛈️";
//when we return then we dont need break;
        case (id>=300 && id<400):
            return "🌦️";
        case (id>=500 && id<600):
            return "🌧️" ;
        case (id>=600 && id<700):
            return "❄️";  
        case (id>=700 && id<800):
            return "🌁";
        case(id===800):
            return "☀️";
        case (id>=801 && id<810):
            return "☁️";
        default:
            return "❓";
    }
}
function displayerror(message){
    const errormessage=document.createElement("p");
    errormessage.textContent=message;
    errormessage.classList.add("errordisplay");
    displays.textContent="";
    displays.style.display="flex";
    displays.appendChild(errormessage);
}