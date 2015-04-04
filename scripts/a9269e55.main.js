!function(a){a.deparam=function(b,c){var d={},e={"true":!0,"false":!1,"null":null};return a.each(b.replace(/\+/g," ").split("&"),function(b,f){var g,h=f.split("="),i=decodeURIComponent(h[0]),j=d,k=0,l=i.split("]["),m=l.length-1;if(/\[/.test(l[0])&&/\]$/.test(l[m])?(l[m]=l[m].replace(/\]$/,""),l=l.shift().split("[").concat(l),m=l.length-1):m=0,2===h.length)if(g=decodeURIComponent(h[1]),c&&(g=g&&!isNaN(g)?+g:"undefined"===g?void 0:void 0!==e[g]?e[g]:g),m)for(;m>=k;k++)i=""===l[k]?j.length:l[k],j=j[i]=m>k?j[i]||(l[k+1]&&isNaN(l[k+1])?{}:[]):g;else a.isArray(d[i])?d[i].push(g):d[i]=void 0!==d[i]?[d[i],g]:g;else i&&(d[i]=c?void 0:"")}),d}}(jQuery),function(a){var b=a.module("dniurlopu",["ngSanitize","ui.router","angular-google-analytics"]);b.config(["$urlRouterProvider","AnalyticsProvider",function(a,b){a.otherwise("/"),b.setAccount("UA-56735417-1"),b.trackPages(!0),b.trackUrlParams(!0),b.setPageEvent("$stateChangeSuccess")}]),b.run(["Analytics",function(){}]),b.controller("NavCtrl",["$scope","$state",function(a,b){a.state=b}])}(angular),window.DniUrlopu={},DniUrlopu.ResultAccumulator=function(){this.laws=[]};var dateSerializeFormat="YYYYMMDD";DniUrlopu.ResultAccumulator.prototype.serialize=function(){var a=[];$.each(this.laws,function(b,c){a.push(c.act+"."+c.art+"."+(c.par||""))});var b={s:this.started.format(dateSerializeFormat),l:a};return this.schoolHandicap&&(b.sy=this.schoolHandicap.years,this.schoolHandicap.finished&&(b.sf=this.schoolHandicap.finished.format(dateSerializeFormat))),encodeURIComponent($.param(b))},DniUrlopu.ResultAccumulator.deserialize=function(a){var b=$.deparam(decodeURIComponent(a)),c=new DniUrlopu.ResultAccumulator;return c.started=moment(b.s,dateSerializeFormat),$.each(b.l,function(a,b){var d=b.split(".");c.laws.push({act:d[0],art:d[1],par:d[2]})}),b.sy&&(c.schoolHandicap={years:parseInt(b.sy,10)},b.sf&&(c.schoolHandicap.finished=moment(b.sf,dateSerializeFormat))),c},DniUrlopu.Question=function(a){this.data=a},DniUrlopu.Question.prototype.ask=function(a){var b=this,c=Q.defer();_gaq.push(["_trackEvent","Question",this.name]);var d=$('<form class="form-inline question panel-primary bg-primary" action="#">			<span class="question-text">'+this.data.text+"</span>		</form>"),e=function(d,e){d.click(function(){var d=$(this).closest(".opt").find("input, select, textarea").serializeArray(),f={},g=$.extend({},a);b.data.laws&&g.laws.push(b.data.laws);for(var h=0;h<d.length;h++)f[d[h].name]=d[h].value;e&&e(g,f),c.resolve(g)})};d.submit(function(){return!1});for(var f=0;f<this.data.answers.length;f++){var g,h,i=this.data.answers[f];i.html?(h=$('<button class="btn btn-lg btn-info">&gt;</button>'),g=$('<div class="opt opt-complex"></div>').append(i.html).append(h)):h=g=$('<button class="btn btn-lg btn-info opt">'+i.text+"</button>"),e(h,i.whenChosen),d.append(g)}return $("#questions").append(d),d.slideDown("slow"),c.promise},DniUrlopu.Question.prototype.dismiss=function(){$("#questions form").slideUp("slow")},DniUrlopu.Question.prototype.hasEnoughData=function(){return!1},DniUrlopu.Questions={create:function(a,b,c){DniUrlopu.Questions[a]=function(){DniUrlopu.Question.call(this,b),this.name=a},DniUrlopu.Questions[a].prototype=Object.create(DniUrlopu.Question.prototype),DniUrlopu.Questions[a].prototype.constructor=DniUrlopu.Questions[a],$.extend(DniUrlopu.Questions[a].prototype,c)}},DniUrlopu.Calculator=function(a){this.questions=a,this.resAccumulator=new DniUrlopu.ResultAccumulator,this.resultAfterStep=[]},DniUrlopu.Calculator.prototype.calculate=function(){var a=this;!function b(c){a.questions[c].ask(a.resAccumulator).then(function(d){a.resultAfterStep[c]=d,a.resAccumulator=d,a.questions[c].dismiss(),a.questions[c].hasEnoughData(a.resAccumulator)||c+1===a.questions.length?a.finish():b(c+1)}).done()}(0)},DniUrlopu.Calculator.prototype._renderResult=function(){var a=this,b=$("#main-result").empty();$.each([DniUrlopu.ResultRenderer,DniUrlopu.LawsRenderer],function(c,d){new d(a.resAccumulator).renderTo(b)})},DniUrlopu.Calculator.prototype.finish=function(){debug("steps",this.resultAfterStep),_gaq.push(["_trackEvent","Calculator","finish"]),$("#intro").slideUp("slow"),this._renderResult(),$("#signup-data").val(this.resAccumulator.serialize()),$(".result").slideDown("slow")},DniUrlopu.Calculator.prototype.finishWith=function(a){this.resAccumulator=a,$("#intro").hide(),this._renderResult(),$(".result:not(.signup)").show()},function(){"use strict";var a=new Date;DniUrlopu.Questions.create("WorkAgreement",{text:"Pierwszą pracę na umowę o pracę rozpocząłem",laws:{act:"KP",art:154,par:1},answers:[{html:'<input class="form-control" name="day" type="number" min="1" max="31" value="1">          <select class="form-control" name="month">              <option value="0">stycznia</option>              <option value="1">lutego</option>              <option value="2">marca</option>              <option value="3">kwietnia</option>              <option value="4">maja</option>              <option value="5">czerwca</option>              <option value="6">lipca</option>              <option value="7">sierpnia</option>              <option value="8">września</option>              <option value="9">października</option>              <option value="10">listopada</option>              <option value="11">grudnia</option>          </select>          <input class="form-control" name="year" type="number"            min="'+(a.getFullYear()-67)+'" max="'+a.getFullYear()+'" value="2012">',whenChosen:function(b,c){parseInt(c.year)===a.getFullYear()&&(b.firstYear=!0,b.laws.push({act:"KP",art:153,par:1})),b.started=moment([c.year,c.month,c.day])}}]},{hasEnoughData:function(a){return moment().subtract(10,"years")>a.started||moment().subtract(2,"years")<a.started}}),DniUrlopu.Questions.create("EducationType",{text:"Ukończyłem szkołę<br>",laws:{act:"KP",art:155,par:1},answers:[{text:"wyższą (licencjacką, magisterską)",whenChosen:function(a){a.schoolHandicap={years:8}}},{text:"policealną",whenChosen:function(a){a.schoolHandicap={years:6}}},{text:"średnią ogólnokształcącą",whenChosen:function(a){a.schoolHandicap={years:4}}},{text:"średnią zawodową",whenChosen:function(a){a.schoolHandicap={years:5}}},{text:"zasadniczą zawodową",whenChosen:function(a){a.schoolHandicap={years:3}}},{text:"żadną z wymienionych"}]},{hasEnoughData:function(a){if(!a.schoolHandicap)return!0;var b=a.started.clone().subtract(a.schoolHandicap.years,"years");return b>moment().subtract(10,"years")}}),DniUrlopu.Questions.create("EducationFinished",{text:"Szkołę zakończyłem",laws:{act:"KP",art:155,par:2},answers:[{html:'<input class="form-control" name="day" type="number" min="1" max="31" value="1">          <select class="form-control" name="month">              <option value="0">stycznia</option>              <option value="1">lutego</option>              <option value="2">marca</option>              <option value="3">kwietnia</option>              <option value="4">maja</option>              <option value="5">czerwca</option>              <option value="6">lipca</option>              <option value="7">sierpnia</option>              <option value="8">września</option>              <option value="9">października</option>              <option value="10">listopada</option>              <option value="11">grudnia</option>          </select>          <input class="form-control" name="year" type="number"            min="'+(a.getFullYear()-10)+'" max="'+a.getFullYear()+'" value="2012">',whenChosen:function(a,b){a.schoolHandicap.finished=moment([b.year,b.month,b.day])}}]})}(),function(){"use strict";moment.locale("pl",{months:["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"]}),DniUrlopu.LawsRenderer=function(a){this.laws=a.laws},DniUrlopu.LawsRenderer.prototype.format=function(a){if("KP"===a.act){var b="Ustawa z dnia 26 czerwca 1974 r. Kodeks pracy, art. "+a.art;return a.par&&(b+=" § "+a.par),'<a href="/#/prawo/kodeks-pracy/art-'+a.art+'/">'+b+"</a>"}return a},DniUrlopu.LawsRenderer.prototype.renderTo=function(a){var b=this,c=$('<ul class="laws"></ul>');$.each(this.laws,function(a,d){c.append("<li>"+b.format(d)+"</li>")});var d=$('<button class="btn btn-default">Podstawa prawna</button>').click(function(){_gaq.push(["_trackEvent","lawsRendered"]),c.slideToggle("slow")});a.append(d),a.append('<button class="btn btn-info pull-right" id="start-over">Oblicz ponownie</button>'),a.append(c.hide())},DniUrlopu.ResultRenderer=function(a){this.result=a},DniUrlopu.ResultRenderer.prototype.renderTable=function(a){if(!a||!a.length)return"";var b="";return $.each(a,function(a,c){b+='<tr><td class="date">'+c.from+"</td><td>"+c.days+" dni</td></tr>"}),'<table class="table table-hover"><thead><tr><th>Od dnia</th><th>Przysługujący wymiar urlopu</th></tr></thead><tbody>'+b+"</tbody></table>"};var a=function(a){return parseFloat(a.toFixed(2))};DniUrlopu.ResultRenderer.prototype.renderTo=function(b){debug("finished",this.result),b.append("<p>W roku "+moment().year()+" przysługuje Ci</p>");var c=this.result.started.clone(),d=[];if(this.result.firstYear){var e=this.result.started.clone().add(1,"year").startOf("year"),f=0,g=20/12;for(c.add(1,"month");e>c;)f+=g,d.push({from:c.format("D MMMM"),days:a(f)}),c.add(1,"month");b.append('<p class="heading">łącznie <span class="number">'+a(f)+"</span> dni urlopu</p>"),b.append(this.renderTable(d)),c.isSame(e,"day")&&b.append('<p>Ponadto, na dzień <span class="date">1 stycznia '+e.year()+'</span> będzie przysługiwać Ci <span class="number">'+a(g)+"</span> dnia urlopu zaległego.</p>")}else{if(this.result.schoolHandicap){if(this.result.schoolHandicap.finished){var h=this.result.schoolHandicap.finished.clone();h.clone().subtract(this.result.schoolHandicap.years,"years")<c&&(c=moment.max(c,h))}c.subtract(this.result.schoolHandicap.years,"years")}c.add(10,"years");var i=c.year(),j=i>moment().year()?20:26;b.append('<p class="heading"><span class="number">'+j+"</span> dni urlopu</p>"),i!==moment().year()||c.isSame(moment().startOf("year"),"day")||(this.result.laws.push({act:"KP",art:158}),d=[{from:"1 stycznia",days:20},{from:c.format("D MMMM"),days:26}],b.append(this.renderTable(d)))}window.getUrlParameter("d")?$(".signup").hide():$("#signup-data").val(this.result.serialize())}}(),function(a){"use strict";var b=a.module("dniurlopu");b.config(["$stateProvider",function(a){a.state("calculator",{url:"/",templateUrl:"calculator/calculator.html",controller:"CalculatorCtrl"})}]),window.debug=function(){"localhost"===window.location.hostname&&console.debug.apply(console,arguments)},window.getUrlParameter=function(a){return(new RegExp(a+"=(.+?)(&|$)").exec(window.location.search)||[,null])[1]};var c=function(){var a=new DniUrlopu.Calculator([new DniUrlopu.Questions.WorkAgreement,new DniUrlopu.Questions.EducationType,new DniUrlopu.Questions.EducationFinished]),b=window.getUrlParameter("d");b?(_gaq.push(["_trackEvent","deserialize"]),a.finishWith(DniUrlopu.ResultAccumulator.deserialize(b))):a.calculate()};b.controller("CalculatorCtrl",function(){$("#main-result").on("click","#start-over",function(){return _gaq.push(["_trackEvent","startOver"]),window.getUrlParameter("d")?void(location.href="/"):($(".result").slideUp("slow"),$("#intro").slideDown("slow"),void c())}),c()})}(angular),function(a){var b=a.module("dniurlopu");b.config(["$stateProvider",function(a){a.state("laws-art",{url:"/prawo/:act/:art/:par",templateUrl:"laws/laws.html",controller:"LawsCtrl"}),a.state("laws",{url:"/prawo/:act/:art",templateUrl:"laws/laws.html",controller:"LawsCtrl"})}]),b.controller("LawsCtrl",["$scope","$stateParams","lawsRepository",function(a,b,c){a.params=b,a.law=c.getLaw(b.act,b.art,b.par),a.isNested=function(a){return"string"!=typeof a}}])}(angular),function(a){var b=a.module("dniurlopu"),c={"kodeks-pracy":{$meta:{titles:["Ustawa z dnia 26 czerwca 1974 r.","Kodeks pracy"],subtitles:["Fragment tekstu ujednoliconego na podstawie Dz. U. 2014, poz. 1502"],currentAsOf:new Date(2015,4,3),partHeaders:["Dział siódmy, rozdział I - Urlopy wypoczynkowe"]},"art-152":{"par-1":"Pracownikowi przysługuje prawo do corocznego, nieprzerwanego, płatnego urlopu wypoczynkowego, zwanego dalej „urlopem”.","par-2":"Pracownik nie może zrzec się prawa do urlopu."},"art-153":{"par-1":"Pracownik podejmujący pracę po raz pierwszy, w roku kalendarzowym, w którym podjął pracę, uzyskuje prawo do urlopu z upływem każdego miesiąca pracy, w wymiarze 1/12 wymiaru urlopu przysługującego mu po przepracowaniu roku.","par-2":"Prawo do kolejnych urlopów pracownik nabywa w każdym następnym roku kalendarzowym."},"art-154":{"par-1":"Wymiar urlopu wynosi:<ol><li>20 dni – jeżeli pracownik jest zatrudniony krócej niż 10 lat;</li><li>26 dni – jeżeli pracownik jest zatrudniony co najmniej 10 lat.</li></ol>","par-2":"Wymiar urlopu dla pracownika zatrudnionego w niepełnym wymiarze czasu pracy ustala się proporcjonalnie do wymiaru czasu pracy tego pracownika, biorąc za podstawę wymiar urlopu określony w § 1; niepełny dzień urlopu zaokrągla się w górę do pełnego dnia.","par-3":"Wymiar urlopu w danym roku kalendarzowym, ustalony na podstawie § 1 i 2, nie może przekroczyć wymiaru określonego w § 1."},"art-154.1":{"par-1":"Do okresu zatrudnienia, od którego zależy prawo do urlopu i wymiar urlopu, wlicza się okresy poprzedniego zatrudnienia, bez względu na przerwy w zatrudnieniu oraz sposób ustania stosunku pracy.","par-2":"W przypadku jednoczesnego pozostawania w dwóch lub więcej stosunkach pracy wliczeniu podlega także okres poprzedniego niezakończonego zatrudnienia w części przypadającej przed nawiązaniem drugiego lub kolejnego stosunku pracy."},"art-154.2":{"par-1":"Urlopu udziela się w dni, które są dla pracownika dniami pracy, zgodnie z obowiązującym go rozkładem czasu pracy, w wymiarze godzinowym, odpowiadającym dobowemu wymiarowi czasu pracy pracownika w danym dniu, z zastrzeżeniem § 4.","par-2":"Przy udzielaniu urlopu zgodnie z § 1, jeden dzień urlopu odpowiada 8 godzinom pracy.","par-3":"Przepis § 1 i 2 stosuje się odpowiednio do pracownika, dla którego dobowa norma czasu pracy, wynikająca z odrębnych przepisów, jest niższa niż 8 godzin.","par-4":"Udzielenie pracownikowi urlopu w dniu pracy w wymiarze godzinowym odpowiadającym części dobowego wymiaru czasu pracy jest dopuszczalne jedynie w przypadku, gdy część urlopu pozostała do wykorzystania jest niższa niż pełny dobowy wymiar czasu pracy pracownika w dniu, na który ma być udzielony urlop."},"art-155":{"par-1":"Do okresu pracy, od którego zależy wymiar urlopu, wlicza się z tytułu ukończenia:<ol><li>zasadniczej lub innej równorzędnej szkoły zawodowej – przewidziany programem nauczania czas trwania nauki, nie więcej jednak niż 3 lata,</li><li>średniej szkoły zawodowej – przewidziany programem nauczania czas trwania nauki, nie więcej jednak niż 5 lat,</li><li>średniej szkoły zawodowej dla absolwentów zasadniczych (równorzędnych) szkół zawodowych – 5 lat,</li><li>średniej szkoły ogólnokształcącej – 4 lata,</li><li>szkoły policealnej – 6 lat,</li><li>szkoły wyższej – 8 lat.</li></ol>Okresy nauki, o których mowa w pkt 1–6, nie podlegają sumowaniu.","par-2":"Jeżeli pracownik pobierał naukę w czasie zatrudnienia, do okresu pracy, od którego zależy wymiar urlopu, wlicza się bądź okres zatrudnienia, w którym była pobierana nauka, bądź okres nauki, zależnie od tego, co jest korzystniejsze dla pracownika."},"art-155.1":{"par-1":'W roku kalendarzowym, w którym ustaje stosunek pracy z pracownikiem uprawnionym do kolejnego urlopu, pracownikowi przysługuje urlop:<ol><li>u dotychczasowego pracodawcy – w wymiarze proporcjonalnym do okresu przepracowanego u tego pracodawcy w roku ustania stosunku pracy, chyba że przed ustaniem tego stosunku pracownik wykorzystał urlop w przysługującym mu lub w wyższym wymiarze;</li><li>u kolejnego pracodawcy – w wymiarze:<ol type="a"><li>proporcjonalnym do okresu pozostałego do końca danego roku kalendarzowego – w razie zatrudnienia na czas nie krótszy niż do końca danego roku kalendarzowego,</li><li>proporcjonalnym do okresu zatrudnienia w danym roku kalendarzowym – w razie zatrudnienia na czas krótszy niż do końca danego roku kalendarzowego, z zastrzeżeniem § 2.</li></ol></li></ol>',"par-2":"Pracownikowi, który przed ustaniem stosunku pracy w ciągu roku kalendarzowego wykorzystał urlop w wymiarze wyższym niż wynikający z § 1 pkt 1, przysługuje u kolejnego pracodawcy urlop w odpowiednio niższym wymiarze; łączny wymiar urlopu w roku kalendarzowym nie może być jednak niższy niż wynikający z okresu przepracowanego w tym roku u wszystkich pracodawców.","par-2.1":"Przepis § 1 pkt 2 stosuje się odpowiednio do pracownika podejmującego pracę u kolejnego pracodawcy w ciągu innego roku kalendarzowego niż rok, w którym ustał jego stosunek pracy z poprzednim pracodawcą.","par-3":'<span class="void">(uchylony)</span>'},"art-155.2":{"par-1":"Przepis art. 155<sup>1</sup> § 1 pkt 2 stosuje się odpowiednio do pracownika powracającego do pracy u dotychczasowego pracodawcy w ciągu roku kalendarzowego po trwającym co najmniej 1 miesiąc okresie:<ol><li>urlopu bezpłatnego;</li><li>urlopu wychowawczego;</li><li>odbywania zasadniczej służby wojskowej lub jej form zastępczych, okresowej służby wojskowej, przeszkolenia wojskowego albo ćwiczeń wojskowych;</li><li>tymczasowego aresztowania;</li><li>odbywania kary pozbawienia wolności;</li><li>nieusprawiedliwionej nieobecności w pracy.</li></ol>","par-2":"Jeżeli okres, o którym mowa w § 1 pkt 1 i 3–6, przypada po nabyciu przez pracownika prawa do urlopu w danym roku kalendarzowym, wymiar urlopu pracownika powracającego do pracy w ciągu tego samego roku kalendarzowego ulega proporcjonalnemu obniżeniu, chyba że przed rozpoczęciem tego okresu pracownik wykorzystał urlop w przysługującym mu lub w wyższym wymiarze."},"art-155.2a":{"par-1":"Przy ustalaniu wymiaru urlopu na podstawie art. 155<sup>1</sup> i 155<sup>2</sup> kalendarzowy miesiąc pracy odpowiada 1/12 wymiaru urlopu przysługującego pracownikowi zgodnie z art. 154 § 1 i 2.","par-2":"Niepełny kalendarzowy miesiąc pracy zaokrągla się w górę do pełnego miesiąca.","par-3":"Jeżeli ustanie stosunku pracy u dotychczasowego pracodawcy i nawiązanie takiego stosunku u kolejnego pracodawcy następuje w tym samym miesiącu kalendarzowym, zaokrąglenia do pełnego miesiąca dokonuje dotychczasowy pracodawca."},"art-155.3":{"par-1":"Przy ustalaniu wymiaru urlopu na podstawie art. 155<sup>1</sup> i 155<sup>2</sup> niepełny dzień urlopu zaokrągla się w górę do pełnego dnia.","par-2":"Wymiar urlopu należny pracownikowi w danym roku kalendarzowym nie może przekroczyć wymiaru wynikającego z art. 154 § 1 i 2."},"art-156":'<span class="void">(uchylony)</span>',"art-157":'<span class="void">(uchylony)</span>',"art-158":"Pracownikowi, który wykorzystał urlop za dany rok kalendarzowy, a następnie uzyskał w ciągu tego roku prawo do urlopu w wyższym wymiarze, przysługuje urlop uzupełniający.","art-159":'<span class="void">(uchylony)</span>',"art-160":'<span class="void">(uchylony)</span>',"art-161":"Pracodawca jest obowiązany udzielić pracownikowi urlopu w tym roku kalendarzowym, w którym pracownik uzyskał do niego prawo.","art-162":"Na wniosek pracownika urlop może być podzielony na części. W takim jednak przypadku co najmniej jedna część wypoczynku powinna trwać nie mniej niż 14 kolejnych dni kalendarzowych.","art-163":{"par-1":"Urlopy powinny być udzielane zgodnie z planem urlopów. Plan urlopów ustala pracodawca, biorąc pod uwagę wnioski pracowników i konieczność zapewnienia normalnego toku pracy. Planem urlopów nie obejmuje się części urlopu udzielanego pracownikowi zgodnie z art. 167<sup>2</sup>.","par-1.1":"Pracodawca nie ustala planu urlopów, jeżeli zakładowa organizacja związkowa wyraziła na to zgodę; dotyczy to także pracodawcy, u którego nie działa zakładowa organizacja związkowa. W takich przypadkach pracodawca ustala termin urlopu po porozumieniu z pracownikiem. Przepis § 1 zdanie drugie i trzecie stosuje się odpowiednio.","par-2":"Plan urlopów podaje się do wiadomości pracowników w sposób przyjęty u danego pracodawcy.","par-3":"Na wniosek pracownicy udziela się jej urlopu bezpośrednio po urlopie macierzyńskim; dotyczy to także pracownika–ojca wychowującego dziecko, który korzysta z urlopu macierzyńskiego."},"art-164":{"par-1":"Przesunięcie terminu urlopu może nastąpić na wniosek pracownika umotywowany ważnymi przyczynami.","par-2":"Przesunięcie terminu urlopu jest także dopuszczalne z powodu szczególnych potrzeb pracodawcy, jeżeli nieobecność pracownika spowodowałaby poważne zakłócenia toku pracy."},"art-165":"Jeżeli pracownik nie może rozpocząć urlopu w ustalonym terminie z przyczyn usprawiedliwiających nieobecność w pracy, a w szczególności z powodu:<ol><li>czasowej niezdolności do pracy wskutek choroby,</li><li>odosobnienia w związku z chorobą zakaźną,</li><li>powołania na ćwiczenia wojskowe albo na przeszkolenie wojskowe na czas do 3 miesięcy,</li><li>urlopu macierzyńskiego,</li></ol>pracodawca jest obowiązany przesunąć urlop na termin późniejszy.","art-166":"Część urlopu niewykorzystaną z powodu:<ol><li>czasowej niezdolności do pracy wskutek choroby,</li><li>odosobnienia w związku z chorobą zakaźną,</li><li>odbywania ćwiczeń wojskowych albo przeszkolenia wojskowego przez czas do 3 miesięcy,</li><li>urlopu macierzyńskiego pracodawca jest obowiązany udzielić w terminie późniejszym.</li></ol>","art-167":{"par-1":"Pracodawca może odwołać pracownika z urlopu tylko wówczas, gdy jego obecności w zakładzie wymagają okoliczności nieprzewidziane w chwili rozpoczynania urlopu.","par-2":"Pracodawca jest obowiązany pokryć koszty poniesione przez pracownika w bezpośrednim związku z odwołaniem go z urlopu."},"art-167.1":"W okresie wypowiedzenia umowy o pracę pracownik jest obowiązany wykorzystać przysługujący mu urlop, jeżeli w tym okresie pracodawca udzieli mu urlopu. W takim przypadku wymiar udzielonego urlopu, z wyłączeniem urlopu zaległego, nie może przekraczać wymiaru wynikającego z przepisów art. 155<sup>1</sup>.","art-167.2":"Pracodawca jest obowiązany udzielić na żądanie pracownika i w terminie przez niego wskazanym nie więcej niż 4 dni urlopu w każdym roku kalendarzowym. Pracownik zgłasza żądanie udzielenia urlopu najpóźniej w dniu rozpoczęcia urlopu.","art-167.3":"Łączny wymiar urlopu wykorzystanego przez pracownika na zasadach i w trybie określonych w art. 167<sup>2</sup> nie może przekroczyć w roku kalendarzowym 4 dni, niezależnie od liczby pracodawców, z którymi pracownik pozostaje w danym roku w kolejnych stosunkach pracy.","art-168":"Urlopu niewykorzystanego w terminie ustalonym zgodnie z art. 163 należy pracownikowi udzielić najpóźniej do dnia 30 września następnego roku kalendarzowego; nie dotyczy to części urlopu udzielanego zgodnie z art. 167<sup>2</sup>.","art-169":'<span class="void">(uchylony)</span>',"art-170":'<span class="void">(uchylony)</span>',"art-171":{"par-1":"W przypadku niewykorzystania przysługującego urlopu w całości lub w części z powodu rozwiązania lub wygaśnięcia stosunku pracy pracownikowi przysługuje ekwiwalent pieniężny.","par-2":'<span class="void">(uchylony)</span>',"par-3":"Pracodawca nie ma obowiązku wypłacenia ekwiwalentu pieniężnego, o którym mowa w § 1, w przypadku gdy strony postanowią o wykorzystaniu urlopu w czasie pozostawania pracownika w stosunku pracy na podstawie kolejnej umowy o pracę zawartej z tym samym pracodawcą bezpośrednio po rozwiązaniu lub wygaśnięciu poprzedniej umowy o pracę z tym pracodawcą."},"art-172":"Za czas urlopu pracownikowi przysługuje wynagrodzenie, jakie by otrzymał, gdyby w tym czasie pracował. Zmienne składniki wynagrodzenia mogą być obliczane na podstawie przeciętnego wynagrodzenia z okresu 3 miesięcy poprzedzających miesiąc rozpoczęcia urlopu; w przypadkach znacznego wahania wysokości wynagrodzenia okres ten może być przedłużony do 12 miesięcy.","art-172.1":{"par-1":"Jeżeli pracodawca na podstawie odrębnych przepisów jest obowiązany objąć pracownika ubezpieczeniem gwarantującym mu otrzymanie świadczenia pieniężnego za czas urlopu, pracownikowi nie przysługuje wynagrodzenie przewidziane w art. 172 lub ekwiwalent pieniężny, o którym mowa w art. 171.","par-2":"Jeżeli świadczenie pieniężne za czas urlopu, o którym mowa w § 1, jest niższe od wynagrodzenia przewidzianego w art. 172 lub od ekwiwalentu pieniężnego, o którym mowa w art. 171, pracodawca jest obowiązany wypłacić pracownikowi kwotę stanowiącą różnicę między tymi należnościami."},"art-173":"Minister Pracy i Polityki Socjalnej określi, w drodze rozporządzenia, szczegółowe zasady udzielania urlopu wypoczynkowego, ustalania i wypłacania wynagrodzenia za czas urlopu oraz ekwiwalentu pieniężnego za urlop."}};b.filter("lawHeader",function(){return function(a){var b=a.split("-"),c=b[1].split("."),d=c[0];return c.length>1&&(d+=" <sup>"+c[1]+"</sup>"),"art"===b[0]?"Art. "+d+".":"par"===b[0]?"§ "+d:void 0}}),b.service("lawsRepository",function(){this.getLaw=function(a,b,d){var e={$meta:c[a].$meta};return d?(e[b]={},e[b][d]=c[a]&&c[a][b]&&c[a][b][d],e):b?(e[b]=c[a]&&c[a][b],e):c[a]}})}(angular);