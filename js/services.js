angular.module('starter.services', [])
.factory('User', function() {

  //Public Return Methods
  return {
    getUser: function(){

      var user = {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password")
      };
      return user;
    }
  }



})

.factory('Wetterdaten', function($http){
  var user = {
    username: window.localStorage.getItem("username"),
    password: window.localStorage.getItem("password")
  };

  var wetterdaten = [];

  return {
    getWetterdaten: function(){
        return wetterdaten;
    },
    setWetterdaten: function(data){
      wetterdaten = data;
    }
  }

})


.factory('Stationen', function(){

var stationen =
  [{"stn":"TAE", "name":"Aadorf / Tänikon", "laenge_breite": "8°54'/47°29'", "km_koordinaten": "710514/259821", "hoehe":"539"},
  {"stn":"COM", "name":"Acquarossa / Comprovasco", "laenge_breite": "8°56'/46°28'", "km_koordinaten": "714998/146440", "hoehe":"575"},
  {"stn":"ABO", "name":"Adelboden", "laenge_breite": "7°34'/46°30'", "km_koordinaten": "609400/148975", "hoehe":"1320"},
  {"stn":"AIG", "name":"Aigle", "laenge_breite": "6°55'/46°20'", "km_koordinaten": "560400/130713", "hoehe":"381"},
  {"stn":"ALT", "name":"Altdorf", "laenge_breite": "8°37'/46°53'", "km_koordinaten": "690174/193558", "hoehe":"438"},
  {"stn":"AND", "name":"Andeer", "laenge_breite": "9°26'/46°37'", "km_koordinaten": "752687/164035", "hoehe":"987"},
  {"stn":"BAS", "name":"Basel / Binningen", "laenge_breite": "7°35'/47°32'", "km_koordinaten": "610911/265600", "hoehe":"316"},
  {"stn":"BER", "name":"Bern / Zollikofen", "laenge_breite": "7°28'/46°59'", "km_koordinaten": "601929/204409", "hoehe":"552"},
  {"stn":"BEZ", "name":"Beznau", "laenge_breite": "8°14'/47°33'", "km_koordinaten": "659808/267693", "hoehe":"325"},
  {"stn":"BIE", "name":"Bière", "laenge_breite": "6°21'/46°31'", "km_koordinaten": "515888/153206", "hoehe":"683"},
  {"stn":"BUS", "name":"Buchs / Aarau", "laenge_breite": "8°05'/47°23'", "km_koordinaten": "648389/248365", "hoehe":"386"},
  {"stn":"FRE", "name":"Bullet / La Frétaz", "laenge_breite": "6°35'/46°50'", "km_koordinaten": "534221/188081", "hoehe":"1205"},
  {"stn":"CHA", "name":"Chasseral", "laenge_breite": "7°03'/47°08'", "km_koordinaten": "570842/220154", "hoehe":"1599"},
  {"stn":"CHU", "name":"Chur", "laenge_breite": "9°32'/46°52'", "km_koordinaten": "759471/193157", "hoehe":"556"},
  {"stn":"CIM", "name":"Cimetta", "laenge_breite": "8°47'/46°12'", "km_koordinaten": "704433/117452", "hoehe":"1661"},
  {"stn":"GSB", "name":"Col du Grand St-Bernard", "laenge_breite": "7°10'/45°52'", "km_koordinaten": "579200/79720", "hoehe":"2472"},
  {"stn":"DAV", "name":"Davos", "laenge_breite": "9°51'/46°49'", "km_koordinaten": "783514/187457", "hoehe":"1594"},
  {"stn":"DIS", "name":"Disentis / Sedrun", "laenge_breite": "8°51'/46°42'", "km_koordinaten": "708188/173789", "hoehe":"1197"},
  {"stn":"ENG", "name":"Engelberg", "laenge_breite": "8°25'/46°49'", "km_koordinaten": "674156/186097", "hoehe":"1035"},
  {"stn":"EVO", "name":"Evolène / Villa", "laenge_breite": "7°31'/46°07'", "km_koordinaten": "605415/106740", "hoehe":"1825"},
  {"stn":"FAH", "name":"Fahy", "laenge_breite": "6°56'/47°25'", "km_koordinaten": "562458/252676", "hoehe":"596"},
  {"stn":"GVE", "name":"Genève-Cointrin", "laenge_breite": "6°08'/46°15'", "km_koordinaten": "498903/122624", "hoehe":"420"},
  {"stn":"GLA", "name":"Glarus", "laenge_breite": "9°04'/47°02'", "km_koordinaten": "723752/210567", "hoehe":"516"},
  {"stn":"GRH", "name":"Grimsel Hospiz", "laenge_breite": "8°20'/46°34'", "km_koordinaten": "668583/158215", "hoehe":"1980"},
  {"stn":"GOE", "name":"Gösgen", "laenge_breite": "7°58'/47°22'", "km_koordinaten": "640417/245937", "hoehe":"380"},
  {"stn":"GUE", "name":"Gütsch ob Andermatt", "laenge_breite": "8°37'/46°39'", "km_koordinaten": "690140/167590", "hoehe":"2287"},
  {"stn":"GUT", "name":"Güttingen", "laenge_breite": "9°17'/47°36'", "km_koordinaten": "738419/273960", "hoehe":"440"},
  {"stn":"HOE", "name":"Hörnli", "laenge_breite": "8°56'/47°22'", "km_koordinaten": "713515/247755", "hoehe":"1132"},
  {"stn":"INT", "name":"Interlaken", "laenge_breite": "7°52'/46°40'", "km_koordinaten": "633019/169093", "hoehe":"577"},
  {"stn":"JUN", "name":"Jungfraujoch", "laenge_breite": "7°59'/46°33'", "km_koordinaten": "641930/155275", "hoehe":"3580"},
  {"stn":"CDF", "name":"La Chaux-de-Fonds", "laenge_breite": "6°48'/47°05'", "km_koordinaten": "550923/214893", "hoehe":"1018"},
  {"stn":"DOL", "name":"La Dôle", "laenge_breite": "6°06'/46°25'", "km_koordinaten": "497061/142362", "hoehe":"1669"},
  {"stn":"MLS", "name":"Le Moléson", "laenge_breite": "7°01'/46°33'", "km_koordinaten": "567723/155072", "hoehe":"1974"},
  {"stn":"LEI", "name":"Leibstadt", "laenge_breite": "8°11'/47°36'", "km_koordinaten": "656378/272111", "hoehe":"341"},
  {"stn":"OTL", "name":"Locarno / Monti", "laenge_breite": "8°47'/46°10'", "km_koordinaten": "704160/114350", "hoehe":"366"},
  {"stn":"LUG", "name":"Lugano", "laenge_breite": "8°58'/46°00'", "km_koordinaten": "717873/95884", "hoehe":"273"},
  {"stn":"LUZ", "name":"Luzern", "laenge_breite": "8°18'/47°02'", "km_koordinaten": "665540/209848", "hoehe":"454"},
  {"stn":"MAG", "name":"Magadino / Cadenazzo", "laenge_breite": "8°56'/46°10'", "km_koordinaten": "715475/113162", "hoehe":"203"},
  {"stn":"MVE", "name":"Montana", "laenge_breite": "7°28'/46°18'", "km_koordinaten": "601706/127482", "hoehe":"1427"},
  {"stn":"LAE", "name":"Lägern", "laenge_breite": "8°24'/47°29'", "km_koordinaten": "672250/259460", "hoehe":"845"},
  {"stn":"MRP", "name":"Monte Rosa-Plattje", "laenge_breite": "7°49'/45°57'", "km_koordinaten": "629149/89520", "hoehe":"2885"},
  {"stn":"MOE", "name":"Möhlin", "laenge_breite": "7°53'/47°34'", "km_koordinaten": "633050/269142", "hoehe":"344"},
  {"stn":"MUB", "name":"Mühleberg", "laenge_breite": "7°17'/46°58'", "km_koordinaten": "587788/202478", "hoehe":"479"},
  {"stn":"NAP", "name":"Napf", "laenge_breite": "7°56'/47°00'", "km_koordinaten": "638132/206078", "hoehe":"1403"},
  {"stn":"NEU", "name":"Neuchâtel", "laenge_breite": "6°57'/47°00'", "km_koordinaten": "563150/205600", "hoehe":"485"},
  {"stn":"CGI", "name":"Nyon / Changins", "laenge_breite": "6°14'/46°24'", "km_koordinaten": "506880/139573", "hoehe":"455"},
  {"stn":"PAY", "name":"Payerne", "laenge_breite": "6°57'/46°49'", "km_koordinaten": "562127/184612", "hoehe":"490"},
  {"stn":"PIL", "name":"Pilatus", "laenge_breite": "8°15'/46°59'", "km_koordinaten": "661910/203410", "hoehe":"2106"},
  {"stn":"PIO", "name":"Piotta", "laenge_breite": "8°41'/46°31'", "km_koordinaten": "695888/152261", "hoehe":"990"},
  {"stn":"COV", "name":"Piz Corvatsch", "laenge_breite": "9°49'/46°25'", "km_koordinaten": "783146/143519", "hoehe":"3305"},
  {"stn":"PLF", "name":"Plaffeien", "laenge_breite": "7°16'/46°45'", "km_koordinaten": "586808/177400", "hoehe":"1042"},
  {"stn":"ROB", "name":"Poschiavo / Robbia", "laenge_breite": "10°04'/46°21'", "km_koordinaten": "801850/136180", "hoehe":"1078"},
  {"stn":"PUY", "name":"Pully", "laenge_breite": "6°40'/46°31'", "km_koordinaten": "540811/151514", "hoehe":"455"},
  {"stn":"ROE", "name":"Robièi", "laenge_breite": "8°31'/46°27'", "km_koordinaten": "682587/144091", "hoehe":"1894"},
  {"stn":"RUE", "name":"Rünenberg", "laenge_breite": "7°53'/47°26'", "km_koordinaten": "633246/253845", "hoehe":"611"},
  {"stn":"SBE", "name":"S. Bernardino", "laenge_breite": "9°11'/46°28'", "km_koordinaten": "734112/147296", "hoehe":"1638"},
  {"stn":"SAM", "name":"Samedan", "laenge_breite": "9°53'/46°32'", "km_koordinaten": "787210/155700", "hoehe":"1708"},
  {"stn":"SHA", "name":"Schaffhausen", "laenge_breite": "8°37'/47°41'", "km_koordinaten": "688698/282796", "hoehe":"438"},
  {"stn":"SCU", "name":"Scuol", "laenge_breite": "10°17'/46°48'", "km_koordinaten": "817135/186393", "hoehe":"1303"},
  {"stn":"SIO", "name":"Sion", "laenge_breite": "7°20'/46°13'", "km_koordinaten": "591630/118575", "hoehe":"482"},
  {"stn":"STG", "name":"St. Gallen", "laenge_breite": "9°24'/47°26'", "km_koordinaten": "747861/254586", "hoehe":"775"},
  {"stn":"SBO", "name":"Stabio", "laenge_breite": "8°56'/45°51'", "km_koordinaten": "716034/77964", "hoehe":"353"},
  {"stn":"SAE", "name":"Säntis", "laenge_breite": "9°21'/47°15'", "km_koordinaten": "744200/234920", "hoehe":"2502"},
  {"stn":"ULR", "name":"Ulrichen", "laenge_breite": "8°18'/46°30'", "km_koordinaten": "666740/150760", "hoehe":"1345"},
  {"stn":"VAD", "name":"Vaduz", "laenge_breite": "9°31'/47°08'", "km_koordinaten": "757718/221696", "hoehe":"457"},
  {"stn":"VIS", "name":"Visp", "laenge_breite": "7°51'/46°18'", "km_koordinaten": "631149/128020", "hoehe":"639"},
  {"stn":"WYN", "name":"Wynau", "laenge_breite": "7°47'/47°15'", "km_koordinaten": "626400/233850", "hoehe":"422"},
  {"stn":"WFJ", "name":"Weissfluhjoch", "laenge_breite": "9°48'/46°50'", "km_koordinaten": "780615/189635", "hoehe":"2690"},
  {"stn":"WAE", "name":"Wädenswil", "laenge_breite": "8°41'/47°13'", "km_koordinaten": "693849/230708", "hoehe":"485"},
  {"stn":"ZER", "name":"Zermatt", "laenge_breite": "7°45'/46°02'", "km_koordinaten": "624350/97566", "hoehe":"1638"},
  {"stn":"REH", "name":"Zürich / Affoltern", "laenge_breite": "8°31'/47°26'", "km_koordinaten": "681428/253545", "hoehe":"443"},
  {"stn":"SMA", "name":"Zürich / Fluntern", "laenge_breite": "8°34'/47°23'", "km_koordinaten": "685117/248061", "hoehe":"555"},
  {"stn":"KLO", "name":"Zürich / Kloten", "laenge_breite": "8°32'/47°29'", "km_koordinaten": "682706/259337", "hoehe":"426"},
  {"stn":"EBK", "name":"Ebnat-Kappel", "laenge_breite": "9°07'/47°16'", "km_koordinaten": "726348/237167", "hoehe":"623"},
  {"stn":"BIZ", "name":"Bischofszell", "laenge_breite": "9°14'/47°30'", "km_koordinaten": "735325/262285", "hoehe":"470"},
  {"stn":"SPF", "name":"Schüpfheim", "laenge_breite": "8°01'/46°57'", "km_koordinaten": "643677/199706", "hoehe":"742"},
  {"stn":"GIH", "name":"Giswil", "laenge_breite": "8°11'/46°51'", "km_koordinaten": "657320/188980", "hoehe":"475"},
  {"stn":"EGO", "name":"Egolzwil", "laenge_breite": "8°00'/47°11'", "km_koordinaten": "642910/225537", "hoehe":"521"},
  {"stn":"BUF", "name":"Buffalora", "laenge_breite": "10°16'/46°39'", "km_koordinaten": "816494/170225", "hoehe":"1968"},
  {"stn":"NAS", "name":"Naluns / Schlivera", "laenge_breite": "10°16'/46°49'", "km_koordinaten": "815374/188987", "hoehe":"2400"},
  {"stn":"CRM", "name":"Cressier", "laenge_breite": "7°04'/47°03'", "km_koordinaten": "571160/210800", "hoehe":"431"},
  {"stn":"HAI", "name":"Salen-Reutenen", "laenge_breite": "9°01'/47°39'", "km_koordinaten": "719102/279042", "hoehe":"718"},
  {"stn":"GRE", "name":"Grenchen", "laenge_breite": "7°25'/47°11'", "km_koordinaten": "598216/225348", "hoehe":"430"},
  {"stn":"CMA", "name":"Crap Masegn", "laenge_breite": "9°11'/46°51'", "km_koordinaten": "732820/189380", "hoehe":"2480"},
  {"stn":"ELM", "name":"Elm", "laenge_breite": "9°11'/46°55'", "km_koordinaten": "732265/198425", "hoehe":"958"},
  {"stn":"GRA", "name":"Fribourg / Posieux", "laenge_breite": "7°07'/46°46'", "km_koordinaten": "575182/180076", "hoehe":"646"},
  {"stn":"LAG", "name":"Langnau i.E.", "laenge_breite": "7°48'/46°56'", "km_koordinaten": "628005/198792", "hoehe":"745"},
  {"stn":"HLL", "name":"Hallau", "laenge_breite": "8°28'/47°42'", "km_koordinaten": "677456/283472", "hoehe":"419"},
  {"stn":"MER", "name":"Meiringen", "laenge_breite": "8°10'/46°44'", "km_koordinaten": "655843/175920", "hoehe":"588"},
  {"stn":"VAB", "name":"Valbella", "laenge_breite": "9°33'/46°45'", "km_koordinaten": "761637/180380", "hoehe":"1569"},
  {"stn":"SCM", "name":"Schmerikon", "laenge_breite": "8°56'/47°13'", "km_koordinaten": "713722/231496", "hoehe":"408"},
  {"stn":"QUI", "name":"Quinten", "laenge_breite": "9°13'/47°08'", "km_koordinaten": "734848/221278", "hoehe":"419"},
  {"stn":"PMA", "name":"Piz Martegnas", "laenge_breite": "9°32'/46°35'", "km_koordinaten": "760267/160583", "hoehe":"2670"},
  {"stn":"SMM", "name":"Sta. Maria, Val Müstair", "laenge_breite": "10°26'/46°36'", "km_koordinaten": "828858/165569", "hoehe":"1383"},
  {"stn":"KOP", "name":"Koppigen", "laenge_breite": "7°36'/47°07'", "km_koordinaten": "612662/218664", "hoehe":"484"},
  {"stn":"ORO", "name":"Oron", "laenge_breite": "6°51'/46°34'", "km_koordinaten": "555502/158048", "hoehe":"827"},
  {"stn":"RAG", "name":"Bad Ragaz", "laenge_breite": "9°30'/47°01'", "km_koordinaten": "756907/209340", "hoehe":"496"},
  {"stn":"PRE", "name":"St-Prex", "laenge_breite": "6°27'/46°29'", "km_koordinaten": "523549/148525", "hoehe":"425"},
  {"stn":"CHD", "name":"Château-d'Oex", "laenge_breite": "7°08'/46°29'", "km_koordinaten": "577041/147644", "hoehe":"1029"},
  {"stn":"STK", "name":"Steckborn", "laenge_breite": "8°59'/47°40'", "km_koordinaten": "715871/280916", "hoehe":"398"},
  {"stn":"EIN", "name":"Einsiedeln", "laenge_breite": "8°45'/47°08'", "km_koordinaten": "699981/221058", "hoehe":"910"},
  {"stn":"EGH", "name":"Eggishorn", "laenge_breite": "8°06'/46°26'", "km_koordinaten": "650279/141897", "hoehe":"2893"},
  {"stn":"BOU", "name":"Bouveret", "laenge_breite": "6°51'/46°24'", "km_koordinaten": "555264/138175", "hoehe":"374"},
  {"stn":"BRZ", "name":"Brienz", "laenge_breite": "8°04'/46°44'", "km_koordinaten": "647546/176806", "hoehe":"567"},
  {"stn":"DEM", "name":"Delémont", "laenge_breite": "7°21'/47°21'", "km_koordinaten": "593269/244543", "hoehe":"439"},
  {"stn":"MOA", "name":"Mosen", "laenge_breite": "8°14'/47°15'", "km_koordinaten": "660124/232846", "hoehe":"452"},
  {"stn":"ATT", "name":"Les Attelas", "laenge_breite": "7°16'/46°06'", "km_koordinaten": "586862/105305", "hoehe":"2730"},
  {"stn":"GEN", "name":"Monte Generoso", "laenge_breite": "9°01'/45°56'", "km_koordinaten": "722503/87456", "hoehe":"1600"},
  {"stn":"GOR", "name":"Gornergrat", "laenge_breite": "7°47'/45°59'", "km_koordinaten": "626900/92512", "hoehe":"3129"},
  {"stn":"GRO", "name":"Grono", "laenge_breite": "9°10'/46°15'", "km_koordinaten": "733014/124080", "hoehe":"323"},
  {"stn":"BOL", "name":"Boltigen", "laenge_breite": "7°23'/46°37'", "km_koordinaten": "595828/163588", "hoehe":"820"},
  {"stn":"TIT", "name":"Titlis", "laenge_breite": "8°26'/46°46'", "km_koordinaten": "675400/180400", "hoehe":"3040"},
  {"stn":"THU", "name":"Thun", "laenge_breite": "7°35'/46°45'", "km_koordinaten": "611202/177630", "hoehe":"570"}];


  return {
    getStationen: function(){
      return stationen;
    },

    getStation: function(id){

      for (var j=0; j < stationen.length; j++){
          if(id === stationen[j].stn){
            return stationen[j];
          }
      }
    }
  }
});
