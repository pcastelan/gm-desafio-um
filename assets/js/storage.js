class NewsletterStorage
{
    constructor() { 
        this.storage = new Storage('cs_');
    }

    addMail(email, name)
    {
        this.storage.addItemByType('newsletter', email, {email, name});
    }

    getList()
    {
        return this.storage.getList('newsletter');
    }
}


class Storage
{
    fallbackStorage = {};
    isLocalAvailable = false;
    prefix = '';

    constructor(prefix) { 
        this.isLocalAvailable = this.isStorageAvailable(); 
        this.prefix = prefix;
    }


    addItemByType(type, key, data = {})
    {
        let list = this.getList(type);
        list[key] = data;

        this.updateList(type, list);
    }

    updateList(type, list)
    {
        if(!this.isLocalAvailable)
        {
           this.fallbackStorage[this.prefix+type] = list;
        }
       
        return localStorage.setItem(this.prefix+type, JSON.stringify(list));
    }

    getList(type)
    {
        if(!this.isLocalAvailable)
        {
           return this.fallbackStorage[this.prefix+type]?this.fallbackStorage[this.prefix+type]:{};
        }
       
        return localStorage.getItem(this.prefix+type)?JSON.parse(localStorage.getItem(this.prefix+type)):{};
    }


    // source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    isStorageAvailable(type = 'localStorage') {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }
}