/**
 * Created by jaric on 10.08.2015.
 */
/**
 * –еализаци€ API, не измен€йте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * ¬аши изменени€ ниже
 */

var requests = ['/countries', '/cities', '/populations'];
var responses = {};

var userInput = window.prompt('Country or city name:', 'Africa');

/**
 * ќшибка возникала в следствии того, что код внутри callback
 * исполн€лс€ после завершени€ цикла, при этом в переменную
 * responses попадал результат только последнего запроса,
 * в следствии чего длина массива l никогда не была равна 3.
 */

requests.forEach(function(request) {
    var callback = function (error, result) {

        responses[request] = result;

        var l = [];
        for (K in responses)
            l.push(K);

        if (l.length == 3) {
            var c = [], cc = [], p = 0;

            var userContinent = null;
            var userCountry = null;
            var userCity = null;

            function findElementByValueAndParamInArray(arr, value, param){
                var index = arr.map(function(e) { return e[param]; }).indexOf(value);
                return index != -1 ? arr[index] : null;
            }

            var element = null;
            element = findElementByValueAndParamInArray(responses['/countries'], userInput, 'continent');
            if (element != null) {
                userContinent = element.continent;
            } else {
                element = findElementByValueAndParamInArray(responses['/countries'], userInput, 'name');
                if (element != null) {
                    userCountry = element.name;
                    c.push(element.name);
                } else {
                    element = findElementByValueAndParamInArray(responses['/cities'], userInput, 'name');
                    if (element != null) {
                        userCity = element.name;
                        cc.push(element.name);
                    }
                }
            }

            if (userContinent != null){
                for (i = 0; i < responses['/countries'].length; i++) {
                    if (responses['/countries'][i].continent === userContinent) {
                        c.push(responses['/countries'][i].name);
                    }
                }
            }

            if (userContinent != null || userCountry != null){
                for (i = 0; i < responses['/cities'].length; i++) {
                    for (j = 0; j < c.length; j++) {
                        if (responses['/cities'][i].country === c[j]) {
                            cc.push(responses['/cities'][i].name);
                        }
                    }
                }
            }

            if (userContinent != null || userCountry != null || userCity != null){
                for (i = 0; i < responses['/populations'].length; i++) {
                    for (j = 0; j < cc.length; j++) {
                        if (responses['/populations'][i].name === cc[j]) {
                            p += responses['/populations'][i].count;
                        }
                    }
                }
            }

            console.log('Total population in ' + userInput + ': ' + p);
        }
    };

    getData(request, callback);
});