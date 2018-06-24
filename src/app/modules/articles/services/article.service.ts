import {Injectable} from '@angular/core';
import {Article} from '../models/article';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Injectable()
export class ArticleService {

  private articles: BehaviorSubject<Article[]>;

  constructor() {
    // Todo: remote call & lazy
    this.articles = new BehaviorSubject<Article[]>(this.loadArticles());
  }

  updateArticle(article: Article) {
    // Todo: remove call & (optimally) reload articles
    const articles = this.articles.getValue();
    const index = articles.findIndex(cur => cur.id === article.id);
    if (index === -1) {
      return throwError('Unknown article id!');
    }
    articles[index] = article;
    this.articles.next(articles);
  }

  public observeArticle(id: string): Observable<Article> {
    const dummyArticle: Article = {
      id: null,
      icon: null,
      title: '',
      snippetText: '',
      fullText: ''
    };
    return this.articles.pipe(
      map(articles => {
        return articles
          .filter(article => article.id === id)
          .reduce((previousValue, currentValue) => !currentValue ? previousValue : currentValue, dummyArticle)
      }),
      distinctUntilChanged()
    );
  }

  private loadArticles(): Article[] {
    const articles: Article[] = [];

    articles.push({
      id: 'about-us',
      title: 'Peeters\nGlosters & Yorkshires',
      icon: null,
      snippetText: '',
      fullText: `titel: Hallo, en welkom op onze website!
      
Mag ik mij even voorstellen en ook mijn zoon Johan. Mijn naam is Richard, 61 jaar, woonachtig in Booischot, en mijn zoon Johan, 37 jaar en ook woonachtig in Booischot bij Heist-op-den-Berg. Onze hobby is het houden en kweken van Gloster Canaries en Yorkshire Canaries. Met enige fierheid mogen wij zeggen dat zowel onze Glosters als onze Yorkshire vogels van goede kwaliteit zijn.

Richard en Johan, november 2008`
    });

    articles.push({
      id: 'glosters',
      title: 'Onze Glosters',
      icon: null,
      snippetText: `In 1980 kocht ik mijn eerste glosterkanaries. Met veel passie kweekte ik mijn eerste glosters en na enkele jaren nam ik ook deel aan plaatselijke vogelshows. Het duurde niet lang voordat ik mijn eerste kampioenen behaalde,vooral met corona's maar ook met de consorts. Geleidelijk kreeg ik in de streek meer en meer bekendheid als kweker van Glosters van goede kwaliteit.

In 1989 ging ik bij Jean Vanderstraeten te rade om mijn stam Glosters verder uit te bouwen en de kwaliteit te verbeteren. Met succes! Jean heeft me geholpen in de verdere opbouw van mijn stam Glosters van uitstekende kwaliteit;vooral wet betreft vederkwaliteit en type.`,
      fullText: `In 1980 kocht ik mijn eerste glosterkanaries. Met veel passie kweekte ik mijn eerste glosters en na enkele jaren nam ik ook deel aan plaatselijke vogelshows. Het duurde niet lang voordat ik mijn eerste kampioenen behaalde,vooral met corona's maar ook met de consorts. Geleidelijk kreeg ik in de streek meer en meer bekendheid als kweker van Glosters van goede kwaliteit.

In 1989 ging ik bij Jean Vanderstraeten te rade om mijn stam Glosters verder uit te bouwen en de kwaliteit te verbeteren. Met succes! Jean heeft me geholpen in de verdere opbouw van mijn stam Glosters van uitstekende kwaliteit;vooral wet betreft vederkwaliteit en type.

Ondertussen werd mijn zoon Johan ouder en al gauw bleek hij ook grote interesse te hebben voor de vogels. Geleidelijk werd hij meer en meer betrokken bij de glosterkweek en werd hij gepassioneerd door deze mooie postuurvogel. In 1993 namen wij voor het eerst deel aan de tentoonstelling van de gloster speciaalclubs met matig succes. Maar we gaven de moed niet op.

In 1995 behaalden wij voor het eerst op de speciaalclubs voor glosters enkele reekswinnaars en dat gaf ons de moed om op de ingeslagen weg verder te gaan.Dankzij de steun van Jean Vanderstraeten en de verdere inbreng van zijn kwaliteitsvogels in onze stam, werd 1996 en succesvol jaar.

We behaalden in 1996 Best Gloster en Best Gloster Corona op verschillende shows: ééndagsshow BPC Antwerpen, Belgium Gloster fancy Canaryclub te Brussel, National Glosterclub te Luik en De Waaslandtrofee te Temse;daarbovenop hadden we nog verschillende reekswinnaars.

Voor de eerste maal namen we ook deel aan het wereldkampioenschap te Reims in januari 1997 en meteen behaalden we de gouden medaille met het kleine,prachtige corona popje van uitmuntende kwaliteit; zowel wat betreft type als vederkwaliteit. Kortom,een prachtexemplaar!

Na de stopzetting van Jean hebben we onze vogels stelselmatig verbeterd door de inbreng van vogels van een zeer gekende Engelse liefhebber.

Wegens drukke beroepsbezigheden nadien was het echter niet meer mogelijk om voldoende tijd te spenderen om nog deel te nemen aan de vogelshows.We moesten het aantal vogels verminderen en hadden niet voldoende tijd om de vogels voor te bereiden op tentoonstellingen.

Sinds enkele maanden ben ik gestopt met werken zodat ik terug de nodige tijd kan vrijmaken om me volledig toe te leggen op de kweek en tentoonstellen van glosters.`
    });

    articles.push({
      id: 'yorkshires',
      title: 'Onze Yorkshires',
      icon: null,
      snippetText: `De gloster is en blijft onze favoriete postuurkanarie, maar ook de yorkshire kanarie, de "gentelman van de postuurkanaries" heeft onze bijzondere aandacht.

In 1996 kocht ik mijn eerste Yorkshires bij 2 gekende Engelse kwekers in de buurt van Nottingham. Na enkele succesvolle kweekseizoenen had ik een mooie stam opgebouwd waarmee ik eveneens kampioenen behaalden op verschillende shows. In 1999 en 2000 behaalde ik Best Yorkshire op de ééndagsshow van BPC Antwerpen.`,
      fullText: `De gloster is en blijft onze favoriete postuurkanarie, maar ook de yorkshire kanarie, de "gentelman van de postuurkanaries" heeft onze bijzondere aandacht.

In 1996 kocht ik mijn eerste Yorkshires bij 2 gekende Engelse kwekers in de buurt van Nottingham. Na enkele succesvolle kweekseizoenen had ik een mooie stam opgebouwd waarmee ik eveneens kampioenen behaalden op verschillende shows. In 1999 en 2000 behaalde ik Best Yorkshire op de ééndagsshow van BPC Antwerpen.

In 2007 deden wij mee op de "Yorkshire Canary Club Belgium" te Charerloi en we behaalden een zeer mooi resultaat: best, 2, 4 en 7 best Novice en verschillende reekswinnaars.Ook op de BPC shows behaalden we goede resultaten.

Met enige fierheid mogen wij zeggen dat zowel onze Glosters als onze Yorkshire vogels van goede kwaliteit zijn.`
    });

    articles.push({
      id: 'competition',
      title: 'Wedstrijden',
      icon: 'fas fa-trophy',
      snippetText: 'Doorheen de jaren zijn we verschillende malen in de prijzen gevallen met onze vogels.',
      fullText: `titel: 2012
- SYCA: Best novice yorkshire and 2 de best in show,Best opposite sex

titel: 2008
- BPC Limburg:Best Yorkshire Fligthed
- SYCA:6 en 7 best novice
- BYCC:3de best novice
- BPC Oost-Vlaanderen:reekswinnaar gloster corona pop groen

titel: 2006 - 2007
- SYCA Luik 2006: 4, 5 en 6 best novice
- Best clear opposite sex
- Syca Luik 2007: 5 en 6 best novice,best clear en fligthed
- BYCC Charerloi: Best,2de,4de en 7 best novice,best clear and varigated
- BPC Limburg 2007: Best Yorkshire

titel: 2004 - 2005
- BPC Limburg: 3de best Yorkshire and best Fligthed
- Best Yorkshire 2005 BPC Limburg

titel: 2003
- BPC Limburg: Best Gloster consort Fligthed
- Best Yorkshire

titel: 2002
- BPC Limburg: Best Gloster Corona
- Best en 3de Best Yorkshire unflighted, Best Yorkshire Flighted
- BPC Oost-Vlaanderen: Best Yorkshire
- SYCA: 3de en 5de best novice en best novice clear

titel: 1999
- BPC Antwerpen 1 dagsshow: Best Yorkshire

titel: 1997
- Wk Reims:Goud Gloster corona individueel
- BGFCC Brussel:Best Corona Flighted and Best Consort unflighted

titel: 1996
- BPC Antwerpen 1 dagsshow: Best Gloster
- National Glosterclub Luik: Best Gloster
- BGFCC Brussel: Best Gloster en Best champion consort
- Waaslandtrofee Temse: Best Gloster`
    });

    articles.push({
      id: 'contact',
      title: 'Contacteer ons',
      icon: 'fas fa-envelope',
      snippetText: 'Heb je vragen? Aarzel dan niet om ons te contacteren!',
      fullText: `titel: Heb je vragen? Aarzel dan niet om ons te contacteren!

Peeters, Richard en Johan
Moerstraat 59
2221 Booischot
België

Tel: +32 15 22 31 46 (Richard)
Tel: +32 15 22 66 87 (Johan)
Email: johanpeeters1@telenet.be`
    });

    return articles;
  }

}
