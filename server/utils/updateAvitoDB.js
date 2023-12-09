import queryDB from "./queryDB.js"

export default async function updateAvitoDB() {
    await queryDB('drop table AvitoItems;')
    await queryDB('create table AvitoItems (id bigint(20),itemName varchar(255),price int,startTime bigint(20),itemLocation varchar(255),photos varchar(1000),avitoLink varchar(500), multiple varchar(255));')

    const reqBody = {
        "infmVersion": "AU-384.9",
        "layout": "pro_filters",
        "categoryID": 0,
        "limit": 50,
        "offset": 0,
        "filters": {
            "statistics": {
                "from": "2023-10-10",
                "to": "2023-11-08"
            }
        },
        "orderBy": "start_time",
        "order": "asc"
    }

    const req = await fetch('https://pro-api.avito.ru/gate/web/1/serp/search', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
            "Cookie": process.env.AVITO_COOKIE
        }
    })

    const data = await req.json()

    const results = data?.result?.results
    console.log(data)
    if (!results) {
        return 'error'
    }
 
    for (let result of results) {
        const fieldsNeeded = {}
        for (let field of result.fields) {
            switch (field.name) {
                case 'id':
                    fieldsNeeded.id = field.value
                    break
                case 'title':
                    fieldsNeeded.title = (field.value).replaceAll(`"`, `'`)
                    break;
                case 'price':
                    fieldsNeeded.price = field.value
                    break;
                case 'startTime':
                    fieldsNeeded.startTime = field.value
                    break;
                case 'geoForPro':
                    fieldsNeeded.itemLocation = field.value.formattedAddress
                    break;
                case 'images':
                    const photos = []
                    for (let photo of field.value) {
                        photos.push(Object.values(photo)[0])
                    }
                    fieldsNeeded.photos = photos
                    break;
                case 'urlPath':
                    fieldsNeeded.avitoLink = 'https://avito.ru' + field.value
                    break
                case 'stock':
                    fieldsNeeded.multiple = JSON.stringify(field.value.multiple)
            }
        }
        const addToDB = await queryDB(`insert into AvitoItems (id, itemName, price, startTime, itemLocation, photos, avitoLink, multiple) values (${fieldsNeeded.id}, "${fieldsNeeded.title}", ${fieldsNeeded.price}, ${fieldsNeeded.startTime}, "${fieldsNeeded.itemLocation}", '${JSON.stringify(fieldsNeeded.photos)}', "${fieldsNeeded.avitoLink}", "${fieldsNeeded.multiple}")`)
    }
}