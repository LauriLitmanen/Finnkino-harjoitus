//luodaan päivämäärä finnkinon xml linkkejä varten
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //Tammikuu on 0
var yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
today = dd + '.' + mm + '.' + yyyy;

function dropdown(){ //"valitse teatteri" nappulan painallus näyttää teatteri listan
    document.getElementById("demo").classList.toggle("show");

}



var id; //id joka käytetään xml linkkiin

function Elokuvat(id){ //ajax funktio
    document.getElementById("demo").classList.toggle("show"); //togglaa teatterilistan pois näkyvistä
    var xmlhttp, xmlDoc; 
        xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "http://www.finnkino.fi/xml/Schedule/?area=" + id + "&dt=" + today ,true); // lisätään päivämäärä ja id linkkiin
                xmlhttp.send();

        xmlhttp.onreadystatechange=function() { // tarkistus lauseke
            if(xmlhttp.readyState==4 && xmlhttp.status==200){
                xmlDoc = xmlhttp.responseXML;
                var x = xmlDoc.getElementsByTagName("Show"); //hakee tiedot Show tagnamen alta
                table=""; // luodaan table johon kuvat ja tiedot lisätään
                    for (i = 0; i <x.length; i++) {  //for loopilla käydään jokainen kohta läpi ja poimitaan tiedot
                        table += "<div class='asdDiv' id='asdDiv' style=display:none;>"; //asdDiv display none jotta saadaan jquery fade in toiminto
                        table += "<div class='myDiv'>";
                        table += "<img src='" + x[i].getElementsByTagName("EventMediumImagePortrait")[0].childNodes[0].nodeValue + "'/>"; //noudetaan kuva
                        table += "</br>";
                        table += "<div class='textDiv'>"; //luodaan textdiv
                        table += x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue; //noudetaan title
                        table += "</br>";
                        var aika = x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue; // alkamisaika
                        var klo = aika.slice(-8); // muokataan aika string parempaan muotoon esim. 12-11-2017-12:00:00 -> 12:00
                        var time = klo.slice(0,-3);
                        table += "Alkaa klo "+time;
                        table += "</br>";
                        var kesto = x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue; //elokuvan pituus
                        table += "Kesto "+kesto+" minuuttia";
                        table += "</br>";
                        var sali = x[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue; //sali numero
                        table += sali;
                        table += "</br>";
                        table += "</div>";
                        table += "</div>";
                        table += "</div>";
                    }         
                   document.getElementById("leffaDiv").innerHTML = table; //lisätään table leffadiviin
                   $(asdDiv).fadeIn(2000); //tuodaan table esiin jqueryn fadein kommennolla
                    
            }
        }   
}
