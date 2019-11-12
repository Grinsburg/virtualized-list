(function() {
    let myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }

    let myRequest = new Request("https://jsonplaceholder.typicode.com/albums/1/photos", myInit);

    fetch(myRequest)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            let jsn = data
            let items = Array(data.id);
            let ph = document.createElement('img');
            for (const key in jsn) {
                let element = jsn[key];
                let id = element.id;
                let name = element.title;
                let photos = element.url;
                items[key] = `<img alt="${name}" src="${photos}"> ${id} ${name}`;
            }
            let holder = document.getElementById('listHolder');
            let view = null
            let itemHeight = (function() {
                var div = document.createElement('div');
                div.appendChild(ph)
                div.className = 'listItem';
                div.innerHTML = 'testing height';
                holder.appendChild(div);
                //get its height and remove it
                let output = div.offsetHeight;
                holder.removeChild(div);
                return output;
            })();


            function refreshWindow() {
                //remove old view
                if (view != null) {
                    holder.removeChild(view);
                }
                //create new view
                view = holder.appendChild(document.createElement('div'));

                let firstItem = Math.floor(holder.scrollTop / itemHeight);
                let lastItem = firstItem + Math.ceil(holder.offsetHeight / itemHeight) + 1;
                if (lastItem + 1 >= items.length) {
                    lastItem = items.length - 1;
                }
                //position view in users face
                view.id = 'view';
                view.style.top = (firstItem * itemHeight) + 'px';

                let div;
                //add the items
                for (let index = firstItem; index <= lastItem; ++index) {
                    div = document.createElement('div');
                    div.innerHTML = items[index];
                    div.className = "listItem";
                    view.appendChild(div);
                }
            }
            refreshWindow();
            document.getElementById('heightForcer').style.height = (items.length * itemHeight) + 'px';
            let hidescrollbar = false;
            if (hidescrollbar = false) {
                //work around for non-chrome browsers, hides the scrollbar
                holder.style.width = (holder.offsetWidth * 2 - view.offsetWidth) + 'px';
            }

            function delayingHandler() {
                //wait for the scroll to finish
                setTimeout(refreshWindow, 10);
            }
            if (holder.addEventListener)
                holder.addEventListener("scroll", delayingHandler, false);
            else
                holder.attachEvent("onscroll", delayingHandler);
        })

}())