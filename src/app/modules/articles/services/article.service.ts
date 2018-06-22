import {Injectable} from '@angular/core';
import {Article} from '../models/article';
import {Observable, of, throwError} from 'rxjs';

@Injectable()
export class ArticleService {

  articles: Article[] = [];

  constructor() {
    this.articles.push({
      id: 'about-us',
      title: 'Peeters\nGlosters & Yorkshires',
      icon: null,
      snippetText: '',
      fullText: `<h2>Hallo, en welkom op onze website!</h2>
Mag ik mij even voorstellen en ook mijn zoon Johan.
Mijn naam is Richard, 61 jaar, woonachtig in Booischot, en mijn zoon Johan, 37 jaar en ook woonachtig in Booischot bij Heist-op-den-Berg.
Onze hobby is het houden en kweken van Gloster Canaries en Yorkshire Canaries.<br>
<br>
Met enige fierheid mogen wij zeggen dat zowel onze Glosters als onze Yorkshire vogels van goede kwaliteit zijn.<br>
<br>
Richard en Johan, november 2008`
    });
    this.articles.push({
      id: 'glosters',
      title: 'Onze Glosters',
      icon: null,
      snippetText: `In 1980 kocht ik mijn eerste glosterkanaries. Met veel passie kweekte ik mijn eerste glosters en na enkele jaren nam ik
ook deel aan plaatselijke vogelshows.Het duurde niet lang voordat ik mijn eerste kampioenen behaalde,vooral met corona's
maar ook met de consorts.Geleidelijk kreeg ik in de streek meer en meer bekendheid als kweker van Glosters van goede
kwaliteit.<br>
<br>
In 1989 ging ik bij Jean Vanderstraeten te rade om mijn stam Glosters verder uit te bouwen en de kwaliteit te verbeteren.
Met succes! Jean heeft me geholpen in de verdere opbouw van mijn stam Glosters van uitstekende kwaliteit;vooral wet betreft
vederkwaliteit en type.`,
      fullText: `In 1980 kocht ik mijn eerste glosterkanaries. Met veel passie kweekte ik mijn eerste glosters en na enkele jaren nam ik
ook deel aan plaatselijke vogelshows.Het duurde niet lang voordat ik mijn eerste kampioenen behaalde,vooral met corona's
maar ook met de consorts.Geleidelijk kreeg ik in de streek meer en meer bekendheid als kweker van Glosters van goede
kwaliteit.<br>
<br>
In 1989 ging ik bij Jean Vanderstraeten te rade om mijn stam Glosters verder uit te bouwen en de kwaliteit te verbeteren.
Met succes! Jean heeft me geholpen in de verdere opbouw van mijn stam Glosters van uitstekende kwaliteit;vooral wet betreft
vederkwaliteit en type.<br>
<br>
Ondertussen werd mijn zoon Johan ouder en al gauw bleek hij ook grote interesse te hebben voor de vogels. Geleidelijk werd
hij meer en meer betrokken bij de glosterkweek en werd hij gepassioneerd door deze mooie postuurvogel.<br>
In 1993 namen wij voor het eerst deel aan de tentoonstelling van de gloster speciaalclubs met matig succes.Maar we gaven
de moed niet op.<br>
<br>
In 1995 behaalden wij voor het eerst op de speciaalclubs voor glosters enkele reekswinnaars en dat gaf ons de moed om op
de ingeslagen weg verder te gaan.Dankzij de steun van Jean Vanderstraeten en de verdere inbreng van zijn kwaliteitsvogels
in onze stam,werd 1996 en succesvol jaar.<br>
<br>
We behaalden in 1996 Best Gloster en Best Gloster Corona op verschillende shows:ééndagsshow BPC Antwerpen,Belgium Gloster
fancy Canaryclub te Brussel,National Glosterclub te Luik en De Waaslandtrofee te Temse;daarbovenop hadden we nog
verschillende reekswinnaars.<br>
<br>
Voor de eerste maal namen we ook deel aan het wereldkampioenschap te Reims in januari 1997 en meteen behaalden we de
gouden medaille met het kleine,prachtige corona popje van uitmuntende kwaliteit; zowel wat betreft type als
vederkwaliteit. Kortom,een prachtexemplaar!<br>
<br>
Na de stopzetting van Jean hebben we onze vogels stelselmatig verbeterd door de inbreng van vogels van een zeer gekende
Engelse liefhebber.<br>
<br>
Wegens drukke beroepsbezigheden nadien was het echter niet meer mogelijk om voldoende tijd te spenderen om nog deel te
nemen aan de vogelshows.We moesten het aantal vogels verminderen en hadden niet voldoende tijd om de vogels voor te
bereiden op tentoonstellingen.<br>
<br>
Sinds enkele maanden ben ik gestopt met werken zodat ik terug de nodige tijd kan vrijmaken om me volledig toe te leggen op
de kweek en tentoonstellen van glosters.`
    });
    this.articles.push({
      id: 'yorkshires',
      title: 'Onze Yorkshires',
      icon: null,
      snippetText: `De gloster is en blijft onze favoriete postuurkanarie, maar ook de yorkshire kanarie, de "gentelman van de
postuurkanaries" heeft onze bijzondere aandacht.<br>
<br>
In 1996 kocht ik mijn eerste Yorkshires bij 2 gekende Engelse kwekers in de buurt van Nottingham. Na enkele succesvolle
kweekseizoenen had ik een mooie stam opgebouwd waarmee ik eveneens kampioenen behaalden op verschillende shows. In 1999 en
2000 behaalde ik Best Yorkshire op de ééndagsshow van BPC Antwerpen.`,
      fullText: `De gloster is en blijft onze favoriete postuurkanarie, maar ook de yorkshire kanarie, de "gentelman van de
postuurkanaries" heeft onze bijzondere aandacht.<br>
<br>
In 1996 kocht ik mijn eerste Yorkshires bij 2 gekende Engelse kwekers in de buurt van Nottingham. Na enkele succesvolle
kweekseizoenen had ik een mooie stam opgebouwd waarmee ik eveneens kampioenen behaalden op verschillende shows. In 1999 en
2000 behaalde ik Best Yorkshire op de ééndagsshow van BPC Antwerpen.<br>
<br>
In 2007 deden wij mee op de "Yorkshire Canary Club Belgium" te Charerloi en we behaalden een zeer mooi resultaat: best, 2,
4 en 7 best Novice en verschillende reekswinnaars.Ook op de BPC shows behaalden we goede resultaten.<br>
<br>
Met enige fierheid mogen wij zeggen dat zowel onze Glosters als onze Yorkshire vogels zijn van goede kwaliteit.`
    });

    this.articles.push({
      id: 'competition',
      title: 'Wedstrijden',
      icon: 'fas fa-trophy',
      snippetText: 'Doorheen de jaren zijn we verschillende malen in de prijzen gevallen met onze vogels.',
      fullText: `<h2>2012</h2>
<ul>
  <li>SYCA: Best novice yorkshire and 2 de best in show,Best opposite sex</li>
</ul>  

<h2>2008</h2>
<ul>
  <li>BPC Limburg:Best Yorkshire Fligthed</li>
  <li>SYCA:6 en 7 best novice</li>
  <li>BYCC:3de best novice</li>
  <li>BPC Oost-Vlaanderen:reekswinnaar gloster corona pop groen</li>
</ul>  

<h2>2006 - 2007</h2>
<ul>
  <li>SYCA Luik 2006: 4, 5 en 6 best novice</li>
  <li>Best clear opposite sex</li>
  <li>Syca Luik 2007: 5 en 6 best novice,best clear en fligthed</li>
  <li>BYCC Charerloi: Best,2de,4de en 7 best novice,best clear and varigated</li>
  <li>BPC Limburg 2007: Best Yorkshire</li>
</ul>      

<h2>2004 - 2005</h2>
<ul>
  <li>BPC Limburg: 3de best Yorkshire and best Fligthed</li>
  <li>Best Yorkshire 2005 BPC Limburg</li>
</ul>

<h2>2003</h2>
<ul>
  <li>BPC Limburg: Best Gloster consort Fligthed</li>
  <li>Best Yorkshire</li>
</ul>

<h2>2002</h2>
<ul>
  <li>BPC Limburg: Best Gloster Corona</li>
  <li>Best en 3de Best Yorkshire unflighted, Best Yorkshire Flighted</li>
  <li>BPC Oost-Vlaanderen: Best Yorkshire</li>
  <li>SYCA: 3de en 5de best novice en best novice clear</li>
</ul>

<h2>1999</h2>
<ul>
  <li>BPC Antwerpen 1 dagsshow: Best Yorkshire</li>
</ul>

<h2>1997</h2>
<ul>
  <li>Wk Reims:Goud Gloster corona individueel</li>
  <li>BGFCC Brussel:Best Corona Flighted and Best Consort unflighted</li>
</ul>

<h2>1996</h2>
<ul>
  <li>BPC Antwerpen 1 dagsshow: Best Gloster</li>
  <li>National Glosterclub Luik: Best Gloster</li>
  <li>BGFCC Brussel: Best Gloster en Best champion consort</li>
  <li>Waaslandtrofee Temse: Best Gloster</li>
</ul>`
    });

    this.articles.push({
      id: 'contact',
      title: 'Contacteer ons',
      icon: 'fas fa-envelope',
      snippetText: 'Heb je vragen? Aarzel dan niet om ons te contacteren!',
      fullText: `<p>Heb je vragen? Aarzel dan niet om ons te contacteren!</p>
<h3>Peeters, Richard en Johan</h3>
Moerstraat 59<br>
2221 Booischot<br>
België<br>
<br>
Tel: +32 15 22 31 46 (Richard)<br>
Tel: +32 15 22 66 87 (Johan)<br>
Email: johanpeeters1@telenet.be<br>`
    });
  }

  getArticle(id: string): Observable<Article> {
    let dummyArticle = {
      id: id,
      title: 'Not found!',
      icon: null,
      fullText: 'Not found!',
      snippetText: 'Not found!'
    };
    const article = this.articles
      .filter(article => article.id === id)
      .reduce((previousValue, currentValue) => !currentValue ? previousValue : currentValue, dummyArticle);
    return of(article);
  }

  updateArticle(article: Article): Observable<Article> {
    const index = this.articles.findIndex(cur => cur.id === article.id);
    if (index === -1) {
      return throwError('Unknown article id!');
    }
    this.articles[index] = article;
    return of(article);
  }
}
