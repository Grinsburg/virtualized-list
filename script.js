(function() {
    let myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }

    let myRequest = new Request("./data.json", myInit);

    fetch(myRequest)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            let jsn = data
            for (const index in jsn) {
                if (jsn) {
                    const element = jsn[index];
                    var elId = element.id;
                }
            }

            var items = Array(elId);

            for (const key in jsn) {
                let element = jsn[key];
                let name = element.name;
                items[key] = key + ' ' + name;
                console.log(element.id);
                console.log(name);
            }
            var hidescrollbar = false;
            // количество строк
            var holder = document.getElementById('listHolder');
            var view = null
                //get the height of a single item
            var itemHeight = (function() {
                //generate a fake item
                var div = document.createElement('div');
                div.className = 'listItem';
                div.innerHTML = 'testing height';
                holder.appendChild(div);
                //get its height and remove it
                var output = div.offsetHeight;
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

                var firstItem = Math.floor(holder.scrollTop / itemHeight);
                var lastItem = firstItem + Math.ceil(holder.offsetHeight / itemHeight) + 1;
                if (lastItem + 1 >= items.length)
                    lastItem = items.length - 1;

                //position view in users face
                view.id = 'view';
                view.style.top = (firstItem * itemHeight) + 'px';

                var div;
                //add the items
                for (var index = firstItem; index <= lastItem; ++index) {
                    div = document.createElement('div');
                    div.innerHTML = items[index];
                    div.className = "listItem";
                    view.appendChild(div);
                }
                // console.log('viewing items ' + firstItem + ' to ' + lastItem);
            }
            refreshWindow();
            document.getElementById('heightForcer').style.height = (items.length * itemHeight) + 'px';
            if (hidescrollbar) {
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

}());