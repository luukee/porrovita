(function($){

    (function(){var e,t;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?d=["","random"]:d=this.options.sortBy.split("-"),p=d[0]==="least"?!0:!1;switch(d[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",p);break;case"liked":e.data=this._sortBy(e.data,"likes.count",p);break;case"commented":e.data=this._sortBy(e.data,"comments.count",p);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){a=e.data,this.options.limit!=null&&a.length>this.options.limit&&(a=a.slice(0,this.options.limit+1||9e9)),n=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(a=this._filter(a,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="",l="",v=document.createElement("div");for(m=0,b=a.length;m<b;m++)s=a[m],u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:u,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;v.innerHTML=i,S=[].slice.call(v.childNodes);for(g=0,w=S.length;g<w;g++)h=S[g],n.appendChild(h)}else for(y=0,E=a.length;y<E;y++)s=a[y],f=document.createElement("img"),u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),f.src=u,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(f),n.appendChild(t)):n.appendChild(f);this.options.target.append(n),r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("instafeed-fetcher")),c="instafeedCache"+this.unique,window[c]=void 0;try{delete window[c]}catch(x){}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],i=function(e){if(t(e))return n.push(e)};for(s=0,o=e.length;s<o;s++)r=e[s],i(r);return n},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.instagramfeed=e}).call(this);

    //Shim for "fixing" IE's lack of support (IE < 9) for applying slice on host objects like NamedNodeMap, NodeList, and HTMLCollection) https://github.com/stevenschobert/instafeed.js/issues/84
    (function(){"use strict";var e=Array.prototype.slice;try{e.call(document.documentElement)}catch(t){Array.prototype.slice=function(t,n){n=typeof n!=="undefined"?n:this.length;if(Object.prototype.toString.call(this)==="[object Array]"){return e.call(this,t,n)}var r,i=[],s,o=this.length;var u=t||0;u=u>=0?u:o+u;var a=n?n:o;if(n<0){a=o+n}s=a-u;if(s>0){i=new Array(s);if(this.charAt){for(r=0;r<s;r++){i[r]=this.charAt(u+r)}}else{for(r=0;r<s;r++){i[r]=this[u+r]}}}return i}}})()

    //IE8 also doesn't offer the .bind() method triggered by the 'sortBy' property. Copy and paste the polyfill offered here:
    if(!Function.prototype.bind){Function.prototype.bind=function(e){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};r.prototype=this.prototype;i.prototype=new r;return i}}


})(jQuery);
/*
function sbi_init(){

    jQuery('#sb_instagram.sbi').each(function(){

        var $self = jQuery(this),
            $target = $self.find('#sbi_images'),
            $loadBtn = $self.find("#sbi_load .sbi_load_btn"),
            imgRes = 'standard_resolution',
            cols = parseInt( this.getAttribute('data-cols'), 10 ),
            num = this.getAttribute('data-num'),
            //Convert styles JSON string to an object
            feedOptions = JSON.parse( this.getAttribute('data-options') ),
            getType = 'user',
            sortby = 'none',
            user_id = this.getAttribute('data-id'),
            num = this.getAttribute('data-num'),
            posts_arr = [],
            $header = '',
            morePosts = []; //Used to determine whether to show the Load More button when displaying posts from more than one id/hashtag. If one of the ids/hashtags has more posts then still show button.

        if( feedOptions.sortby !== '' ) sortby = feedOptions.sortby;

        switch( this.getAttribute('data-res') ) {
            case 'auto':
                var feedWidth = jQuery('#sb_instagram').innerWidth(),
                    colWidth = jQuery('#sb_instagram').innerWidth() / cols;

                if( feedWidth < 680 ) colWidth = 300; //Use 306x306 images
                if( feedWidth < 480 && feedWidth > 300 ) colWidth = 480; //Use full size images

                if( colWidth < 150 ){
                    imgRes = 'thumbnail';
                } else if( colWidth < 306 ){
                    imgRes = 'low_resolution';
                } else {
                    imgRes = 'standard_resolution';
                }

                break;
            case 'thumb':
                imgRes = 'thumbnail';
                break;
            case 'medium':
                imgRes = 'low_resolution';
                break;
            default:
                imgRes = 'standard_resolution';
        }

        //Split comma separated hashtags into array
        var ids_arr = user_id.replace(/ /g,'').split(",");
        var looparray = ids_arr;

        //Get page info for first User ID
        var headerStyles = '',
            sbi_page_url = 'https://api.instagram.com/v1/users/' + ids_arr[0] + '?access_token=' + sb_instagram_js_options.sb_instagram_at;

        if(feedOptions.headercolor.length) headerStyles = 'style="color: #'+feedOptions.headercolor+'"';

        jQuery.ajax({
            method: "GET",
            url: sbi_page_url,
            dataType: "jsonp",
            success: function(data) {
                $header = '<a href="http://instagram.com/'+data.data.username+'" target="_blank" title="@'+data.data.username+'" class="sbi_header_link">';
                $header += '<div class="sbi_header_text">';
                $header += '<h3 ' + headerStyles;
                if( data.data.bio.length == 0 ) $header += ' class="sbi_no_bio"';
                $header += '>@'+data.data.username+'</h3>';
                if( data.data.bio.length ) $header += '<p class="sbi_bio" '+headerStyles+'>'+data.data.bio+'</p>';
                $header += '</div>';
                $header += '<div class="sbi_header_img">';
                $header += '<div class="sbi_header_img_hover"><i class="fa fa-instagram"></i></div>';
                $header += '<img src="'+data.data.profile_picture+'" alt="'+data.data.full_name+'" width="50" height="50">';
                $header += '</div>';
                $header += '</a>';
                //Add the header
                $self.find('.sb_instagram_header').prepend( $header );
                //Change the URL of the follow button
                if( $self.find('.sbi_follow_btn').length ) $self.find('.sbi_follow_btn a').attr('href', 'http://instagram.com/' + data.data.username )
            }
        });

        //Loop through User IDs
        // looparray.forEach(function(entry) {
        jQuery.each( looparray, function( index, entry ) {

            var userFeed = new instagramfeed({
                target: $target,
                get: getType,
                sortBy: sortby,
                resolution: imgRes,
                limit: parseInt( num, 10 ),
                template: '<div class="sbi_item sbi_type_{{model.type}} sbi_new" id="sbi_{{id}}" data-date="{{model.created_time_raw}}"><div class="sbi_photo_wrap"><a class="sbi_photo" href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" /></a></div></div>',
                filter: function(image) {
                    //Create time for sorting
                    var date = new Date(image.created_time*1000),
                        time = date.getTime();
                    image.created_time_raw = time;

                    //Replace double quotes in the captions with the HTML symbol
                    //Always check to make sure it exists
                    if(image.caption != null) image.caption.text = image.caption.text.replace(/"/g, "&quot;");

                    return true;
                },
                userId: parseInt( entry, 10 ),
                accessToken: sb_instagram_js_options.sb_instagram_at,
                after: function() {

                    $self.find('.sbi_loader').remove();

                    /* Load more button */
       /*             if (this.hasNext()) morePosts.push('1');

                    if(morePosts.length > 0){
                        $loadBtn.show();
                    } else {
                        $loadBtn.hide();
                        $self.css('padding-bottom', 0);
                    }

                    // Call Custom JS if it exists
                    if (typeof sbi_custom_js == 'function') sbi_custom_js();

                    //Fade photos on hover
                    jQuery('#sb_instagram .sbi_photo').each(function(){
                        jQuery(this).hover(function(){
                            jQuery(this).fadeTo(200, 0.85);
                        }, function(){
                            jQuery(this).stop().fadeTo(500, 1);
                        });
                    });

                    //Only show images once they are fully loaded. Prevents issue in Firefox where alt text is shown initially before images appear.
                    // jQuery('#sb_instagram .sbi_new img').on('load', function() {
                    //     jQuery(this).removeClass('sbi_hide');
                    // });


                    //Sort posts by date
                    //only sort the new posts that are loaded in, not the whole feed, otherwise some photos will switch positions due to dates
                    $self.find('#sbi_images .sbi_item.sbi_new').sort(function (a, b) {
                        var aComp = jQuery(a).data('date'),
                            bComp = jQuery(b).data('date');

                        if(sortby == 'none'){
                            //Order by date
                            return bComp - aComp;
                        } else {
                            //Randomize
                            return (Math.round(Math.random())-0.5);
                        }

                    }).appendTo( $self.find("#sbi_images") );

                    //Remove the new class after 500ms, once the sorting is done
                    setTimeout(function(){
                        jQuery('#sbi_images .sbi_item.sbi_new').removeClass('sbi_new');
                        //Reset the morePosts variable so we can check whether there are more posts every time the Load More button is clicked
                        morePosts = [];
                    }, 500);


                }, // End 'after' function
                error: function(data) {
                    var sbiErrorMsg = '',
                        sbiErrorDir = '';

                    if( data.indexOf('access_token') > -1 ){
                        sbiErrorMsg += '<p><b>Error: Access Token is not valid</b><br /><span>This error message is only visible to WordPress admins</span>';
                        sbiErrorDir = "<p>There's an issue with the Instagram Access Token that you are using. Please obtain a new Access Token on the plugin's Settings page.";
                    } else if( data.indexOf('user does not exist') > -1 ){
                        sbiErrorMsg += '<p><b>Error: The User ID does not exist</b><br /><span>This error is only visible to WordPress admins</span>';
                        sbiErrorDir = "<p>Please double check the Instagram User ID that you are using. To find your User ID simply enter your Instagram user name into this <a href='http://www.otzberg.net/iguserid/' target='_blank'>tool</a>.</p>";
                    }

                    //Add the error message to the page unless the user is displaying multiple ids or hashtags
                    if(looparray.length < 2) jQuery('#sb_instagram').empty().append( '<p style="text-align: center;">Unable to show Instagram photos</p><div id="sbi_mod_error">' + sbiErrorMsg + sbiErrorDir + '</div>');
                }
            });

            $loadBtn.click(function() {
                userFeed.next();
            });

            userFeed.run();

        }); //End User ID array loop


    });

}
sbi_init();
*/
/*! modernizr 3.0.0-alpha.3 (Custom Build) | MIT *
 * http://v3.modernizr.com/download/#-audio-backgroundblendmode-backgroundsize-borderradius-boxshadow-cssanimations-csstransforms-csstransforms3d-csstransitions-inlinesvg-input-inputtypes-opacity-placeholder-svg-textshadow-video-domprefixes-load-prefixed-prefixes-shiv-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,a,i,s;for(var l in y){if(e=[],t=y[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),g.push((o?"":"no-")+s.join("-"))}}function a(e){var t=S.className,n=Modernizr._config.classPrefix||"";if(Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),S.className=t)}function i(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function s(){var e=t.body;return e||(e=P("body"),e.fake=!0),e}function l(e,t,n,r){var o,a,i,l,c="modernizr",d=P("div"),u=s();if(parseInt(n,10))for(;n--;)i=P("div"),i.id=r?r[n]:c+(n+1),d.appendChild(i);return o=["&#173;",'<style id="s',c,'">',e,"</style>"].join(""),d.id=c,(u.fake?u:d).innerHTML+=o,u.appendChild(d),u.fake&&(u.style.background="",u.style.overflow="hidden",l=S.style.overflow,S.style.overflow="hidden",S.appendChild(u)),a=t(d,e),u.fake?(u.parentNode.removeChild(u),S.style.overflow=l,S.offsetHeight):d.parentNode.removeChild(d),!!a}function c(e,t){return!!~(""+e).indexOf(t)}function d(e,t){return function(){return e.apply(t,arguments)}}function u(e,t,n){var o;for(var a in e)if(e[a]in t)return n===!1?e[a]:(o=t[e[a]],r(o,"function")?d(o,n||t):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];o--;)a.push("("+p(t[o])+":"+r+")");return a=a.join(" or "),l("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function m(e,t,o,a){function s(){d&&(delete U.style,delete U.modElem)}if(a=r(a,"undefined")?!1:a,!r(o,"undefined")){var l=f(e,o);if(!r(l,"undefined"))return l}var d,u,p,m,h;for(U.style||(d=!0,U.modElem=P("modernizr"),U.style=U.modElem.style),p=e.length,u=0;p>u;u++)if(m=e[u],h=U.style[m],c(m,"-")&&(m=i(m)),U.style[m]!==n){if(a||r(o,"undefined"))return s(),"pfx"==t?m:!0;try{U.style[m]=o}catch(v){}if(U.style[m]!=h)return s(),"pfx"==t?m:!0}return s(),!1}function h(e,t,n,o,a){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+A.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?m(s,t,o,a):(s=(e+" "+E.join(i+" ")+i).split(" "),u(s,t,n))}function v(e,t,r){return h(e,n,n,t,r)}var g=[];!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=b.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),b.elements=n+" "+e,c(t)}function a(e){var t=y[e[v]];return t||(t={},g++,e[v]=g,y[g]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=a(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||a(e);for(var o=n.frag.cloneNode(),i=0,s=r(),l=s.length;l>i;i++)o.createElement(s[i]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function c(e){e||(e=t);var r=a(e);return!b.shivCSS||d||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||l(e,r),e}var d,u,p="3.7.2",f=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,u=!0}}();var b={elements:f.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:p,shivCSS:f.shivCSS!==!1,supportsUnknownElements:u,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:c,createElement:i,createDocumentFragment:s,addElements:o};e.html5=b,c(t)}(this,t);var y=[],b={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){y.push({name:e,fn:t,options:n})},addAsyncTest:function(e){y.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=b,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var x=function(){},w=function(){};e.console&&(x=function(){var t=console.error?"error":"log";e.console[t].apply(e.console,Array.prototype.slice.call(arguments))},w=function(){var t=console.warn?"warn":"log";e.console[t].apply(e.console,Array.prototype.slice.call(arguments))}),b.load=function(){"yepnope"in e?(w("yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. yepnope appears to be available on the page, so we’ll use it to handle this call to Modernizr.load, but please update your code to use yepnope directly.\n See http://github.com/Modernizr/Modernizr/issues/1182 for more information."),e.yepnope.apply(e,[].slice.call(arguments,0))):x("yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. Get it from http://yepnopejs.com. See http://github.com/Modernizr/Modernizr/issues/1182 for more information.")};var C=b._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];b._prefixes=C;var S=t.documentElement,T="Moz O ms Webkit",E=b._config.usePrefixes?T.toLowerCase().split(" "):[];b._domPrefixes=E;var P=function(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):t.createElement.apply(t,arguments)};Modernizr.addTest("opacity",function(){var e=P("div"),t=e.style;return t.cssText=C.join("opacity:.55;"),/^0.55$/.test(t.opacity)}),Modernizr.addTest("audio",function(){var e=P("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("video",function(){var e=P("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("inlinesvg",function(){var e=P("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==(e.firstChild&&e.firstChild.namespaceURI)}),Modernizr.addTest("placeholder","placeholder"in P("input")&&"placeholder"in P("textarea"));var k="CSS"in e&&"supports"in e.CSS,_="supportsCSS"in e;Modernizr.addTest("supports",k||_);var z=P("input"),M="search tel url email datetime date month week time datetime-local number range color".split(" "),$={},j=":)";Modernizr.inputtypes=function(e){for(var r,o,a,i=e.length,s=0;i>s;s++)z.setAttribute("type",o=e[s]),r="text"!==z.type,r&&(z.value=j,z.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(o)&&z.style.WebkitAppearance!==n?(S.appendChild(z),a=t.defaultView,r=a.getComputedStyle&&"textfield"!==a.getComputedStyle(z,null).WebkitAppearance&&0!==z.offsetHeight,S.removeChild(z)):/^(search|tel)$/.test(o)||(r=/^(url|email|number)$/.test(o)?z.checkValidity&&z.checkValidity()===!1:z.value!=j)),$[e[s]]=!!r;return $}(M);var N={},L="autocomplete autofocus list placeholder max min multiple pattern required step".split(" ");Modernizr.input=function(t){for(var n=0,r=t.length;r>n;n++)N[t[n]]=!!(t[n]in z);return N.list&&(N.list=!(!P("datalist")||!e.HTMLDataListElement)),N}(L);var A=b._config.usePrefixes?T.split(" "):[];b._cssomPrefixes=A;var F=function(t){var r,o=C.length,a=e.CSSRule;if("undefined"==typeof a)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in a)return"@"+t;for(var i=0;o>i;i++){var s=C[i],l=s.toUpperCase()+"_"+r;if(l in a)return"@-"+s.toLowerCase()+"-"+t}return!1},H=b.testStyles=l,R={elem:P("modernizr")};Modernizr._q.push(function(){delete R.elem});var U={style:R.elem.style};Modernizr._q.unshift(function(){delete U.style});var D=b.testProp=function(e,t,r){return m([e],n,t,r)};Modernizr.addTest("textshadow",D("textShadow","1px 1px")),b.testAllProps=h;var q=b.prefixed=function(e,t,n){return 0===e.indexOf("@")?F(e):(-1!=e.indexOf("-")&&(e=i(e)),t?h(e,t,n):h(e,"pfx"))};Modernizr.addTest("backgroundblendmode",q("backgroundBlendMode","text")),b.testAllProps=v,Modernizr.addTest("backgroundsize",v("backgroundSize","100%",!0)),Modernizr.addTest("borderradius",v("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",v("boxShadow","1px 1px",!0)),Modernizr.addTest("cssanimations",v("animationName","a",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&v("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!v("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in S.style)){var n;Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}",H(n,function(t){e=9===t.offsetLeft&&5===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",v("transition","all",!0)),o(),a(g),delete b.addTest,delete b.addAsyncTest;for(var B=0;B<Modernizr._q.length;B++)Modernizr._q[B]();e.Modernizr=Modernizr}(window,document);
/*! Respond.js v1.4.1: min/max-width, min/max-height media query polyfill * Copyright 2013 Scott Jehl
 * Licensed under https://github.com/scottjehl/Respond/blob/master/LICENSE-MIT
 *  */

!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){u(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))};if(c.ajax=f,c.queue=d,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,maxw:/\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,minh:/\([\s]*min\-height\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,maxh:/\([\s]*max\-height\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var g,h,i,j=a.document,k=j.documentElement,l=[],m=[],n=[],o={},p=30,q=j.getElementsByTagName("head")[0]||k,r=j.getElementsByTagName("base")[0],s=q.getElementsByTagName("link"),t=function(){var a,b=j.createElement("div"),c=j.body,d=k.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=j.createElement("body"),c.style.background="none"),k.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&k.insertBefore(c,k.firstChild),a=b.offsetWidth,f?k.removeChild(c):c.removeChild(b),k.style.fontSize=d,e&&(c.style.fontSize=e),a=i=parseFloat(a)},u=function(b){var c="clientWidth",d=k[c],e="CSS1Compat"===j.compatMode&&d||j.body[c]||d,f="clientHeight",o=k[f],r="CSS1Compat"===j.compatMode&&o||j.body[f]||o,v={},w=s[s.length-1],x=(new Date).getTime();if(b&&g&&p>x-g)return a.clearTimeout(h),h=a.setTimeout(u,p),void 0;g=x;for(var y in l)if(l.hasOwnProperty(y)){var z=l[y],A=z.minw,B=z.maxw,C=z.minh,D=z.maxh,E=null===A,F=null===B,G=null===C,H=null===D,I="em";A&&(A=parseFloat(A)*(A.indexOf(I)>-1?i||t():1)),B&&(B=parseFloat(B)*(B.indexOf(I)>-1?i||t():1)),C&&(C=parseFloat(C)*(C.indexOf(I)>-1?i||t():1)),D&&(D=parseFloat(D)*(D.indexOf(I)>-1?i||t():1)),z.hasquery&&(E&&F&&G&&H||!(E||e>=A)||!(F||B>=e)||!(G||r>=C)||!(H||D>=r))||(v[z.media]||(v[z.media]=[]),v[z.media].push(m[z.rules]))}for(var J in n)n.hasOwnProperty(J)&&n[J]&&n[J].parentNode===q&&q.removeChild(n[J]);for(var K in v)if(v.hasOwnProperty(K)){var L=j.createElement("style"),M=v[K].join("\n");L.type="text/css",L.media=K,q.insertBefore(L,w.nextSibling),L.styleSheet?L.styleSheet.cssText=M:L.appendChild(j.createTextNode(M)),n.push(L)}},v=function(a,b,d){var e=a.replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var g=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},h=!f&&d;b.length&&(b+="/"),h&&(f=1);for(var i=0;f>i;i++){var j,k,n,o;h?(j=d,m.push(g(a))):(j=e[i].match(c.regex.findStyles)&&RegExp.$1,m.push(RegExp.$2&&g(RegExp.$2))),n=j.split(","),o=n.length;for(var p=0;o>p;p++)k=n[p],l.push({media:k.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:m.length-1,hasquery:k.indexOf("(")>-1,minw:k.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:k.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),minh:k.match(c.regex.minh)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxh:k.match(c.regex.maxh)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},w=function(){if(d.length){var b=d.shift();f(b.href,function(c){v(c,b.href,b.media),o[b.href]=!0,a.setTimeout(function(){w()},0)})}},x=function(){for(var b=0;b<s.length;b++){var c=s[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase(),h=c.getAttribute("data-no-respond");e&&g&&!o[e]&&null===h&&(c.styleSheet&&c.styleSheet.rawCssText?(v(c.styleSheet.rawCssText,e,f),o[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!r||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}w()};x(),c.update=x,c.getEmValue=t,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.scrollReveal = factory();
  }
}(this, function(require, exports, module) {

/*
                       _ _ _____                      _   _
                      | | |  __ \                    | | (_)
    ___  ___ _ __ ___ | | | |__) |_____   _____  __ _| |  _ ___
   / __|/ __| '__/ _ \| | |  _  // _ \ \ / / _ \/ _` | | | / __|
   \__ \ (__| | | (_) | | | | \ \  __/\ V /  __/ (_| | |_| \__ \
   |___/\___|_|  \___/|_|_|_|  \_\___| \_/ \___|\__,_|_(_) |___/ v2.3.2
                                                        _/ |
                                                       |__/

================================================================================

   scrollReveal.js (c) 2015 Julian Lloyd ( @julianlloyd )
   Licensed under MIT ( http://www.opensource.org/licenses/mit-license.php )

==============================================================================*/

window.scrollReveal = (function( window ){

  'use strict';

  var _requestAnimFrame;
  var _extend;
  var _handler;
  var self;

  function scrollReveal( config ){

    if ( !( this instanceof scrollReveal ) ) {
      return new scrollReveal( config );
    }

    self         = this;
    self.elems   = {};
    self.serial  = 1;
    self.blocked = false;
    self.config  = _extend( self.defaults, config );

    if ( self.isMobile() && !self.config.mobile || !self.isSupported() ){
      self.destroy();
      return;
    }

    if ( self.config.viewport === window.document.documentElement ){

      window.addEventListener( 'scroll', _handler, false );
      window.addEventListener( 'resize', _handler, false );

    } else {
      self.config.viewport.addEventListener( 'scroll', _handler, false );
    }

    self.init( true );
  }

  scrollReveal.prototype = {

    defaults: {

      enter:    'bottom',
      move:     '8px',
      over:     '0.6s',
      wait:     '0s',
      easing:   'ease',

      scale:    { direction: 'up', power: '5%' },
      rotate:   { x: 0, y: 0, z: 0 },

      opacity:  0,
      mobile:   false,
      reset:    false,

      //        Expects a reference to a DOM node (the <html> node by default)
      //        which is used as the context when checking element visibility.
      viewport: window.document.documentElement,

      //        'always' — delay every time an animation resets
      //        'onload' - delay only for animations triggered by first load
      //        'once'   — delay only the first time an animation reveals
      delay:    'once',

      //        vFactor changes when an element is considered in the viewport.
      //        The default value of 0.60 means 60% of an element must be
      //        visible for its reveal animation to trigger.
      vFactor:  0.60,

      complete: function( el ){} // Note: reset animations do not complete.
    },

    // Queries the DOM, builds scrollReveal elements and triggers animation.
    // @param {boolean} flag — a hook for controlling delay on first load.
    init: function( flag ){

      var serial;
      var elem;
      var query;

      query = Array.prototype.slice.call( self.config.viewport.querySelectorAll('[data-sr]') );
      query.forEach(function( el ){

        serial      = self.serial++;
        elem        = self.elems[ serial ] = { domEl: el };
        elem.config = self.configFactory( elem );
        elem.styles = self.styleFactory( elem );
        elem.seen   = false;

        el.removeAttribute('data-sr');

        el.setAttribute( 'style',
            elem.styles.inline
          + elem.styles.initial
        );
      })

      self.scrolled = self.scrollY();
      self.animate( flag );
    },

    // Applies and removes appropriate styles.
    // @param {boolean} flag — a hook for controlling delay on first load.
    animate: function( flag ){

      var key;
      var elem;
      var visible;

      // Begin element store digest.
      for ( key in self.elems ){
        if ( self.elems.hasOwnProperty( key ) ){

          elem    = self.elems[ key ];
          visible = self.isElemInViewport( elem );

          if ( visible ){

            if ( self.config.delay === 'always'
            || ( self.config.delay === 'onload' && flag )
            || ( self.config.delay === 'once'   && !elem.seen ) ){

              // Use delay.
              elem.domEl.setAttribute( 'style',
                  elem.styles.inline
                + elem.styles.target
                + elem.styles.transition
              );

            } else {

              // Don’t use delay.
              elem.domEl.setAttribute( 'style',
                  elem.styles.inline
                + elem.styles.target
                + elem.styles.reset
              );
            }

            elem.seen = true;

            if ( !elem.config.reset && !elem.animating ){
              elem.animating = true;
              complete( key );
              // if ( elem.domEl.classList.contains("case") ){
              //   $('#creek').get(0).play();
              // }
            }

          } else if ( !visible && elem.config.reset ){

            elem.domEl.setAttribute( 'style',
                elem.styles.inline
              + elem.styles.initial
              + elem.styles.reset
            );
          }
        }
      }

      // Digest complete, now un-block the event handler.
      self.blocked = false;

      // Cleans the DOM and removes completed elements from self.elems.
      // @param {integer} key — self.elems property key.
      function complete( key ){

        var elem = self.elems[ key ];

        setTimeout(function(){

          elem.domEl.setAttribute( 'style', elem.styles.inline );
          elem.config.complete( elem.domEl );
          delete self.elems[ key ];

        }, elem.styles.duration );
      }
    },

    // Parses an elements data-sr attribute, and returns a configuration object.
    // @param {object} elem — An object from self.elems.
    // @return {object}
    configFactory: function( elem ){

      var parsed = {};
      var config = {};
      var words  = elem.domEl.getAttribute('data-sr').split( /[, ]+/ );

      words.forEach(function( keyword, i ){
        switch ( keyword ){

          case 'enter':

            parsed.enter = words[ i + 1 ];
            break;

          case 'wait':

            parsed.wait = words[ i + 1 ];
            break;

          case 'move':

            parsed.move = words[ i + 1 ];
            break;

          case 'ease':

            parsed.move = words[ i + 1 ];
            parsed.ease = 'ease';
            break;

          case 'ease-in':

            if ( words[ i + 1 ] == 'up' || words[ i + 1 ] == 'down' ){

              parsed.scale.direction = words[ i + 1 ];
              parsed.scale.power     = words[ i + 2 ];
              parsed.easing          = 'ease-in';
              break;
            }

            parsed.move   = words[ i + 1 ];
            parsed.easing = 'ease-in';
            break;

          case 'ease-in-out':

            if ( words[ i + 1 ] == 'up' || words[ i + 1 ] == 'down' ){

              parsed.scale.direction = words[ i + 1 ];
              parsed.scale.power     = words[ i + 2 ];
              parsed.easing          = 'ease-in-out';
              break;
            }

            parsed.move   = words[ i + 1 ];
            parsed.easing = 'ease-in-out';
            break;

          case 'ease-out':

            if ( words[ i + 1 ] == 'up' || words[ i + 1 ] == 'down' ){

              parsed.scale.direction = words[ i + 1 ];
              parsed.scale.power     = words[ i + 2 ];
              parsed.easing          = 'ease-out';
              break;
            }

            parsed.move   = words[ i + 1 ];
            parsed.easing = 'ease-out';
            break;

          case 'hustle':

            if ( words[ i + 1 ] == 'up' || words[ i + 1 ] == 'down' ){

              parsed.scale.direction = words[ i + 1 ];
              parsed.scale.power     = words[ i + 2 ];
              parsed.easing          = 'cubic-bezier( 0.6, 0.2, 0.1, 1 )';
              break;
            }

            parsed.move   = words[ i + 1 ];
            parsed.easing = 'cubic-bezier( 0.6, 0.2, 0.1, 1 )';
            break;

          case 'over':

            parsed.over = words[ i + 1 ];
            break;

          case 'flip':
          case 'pitch':
            parsed.rotate   = parsed.rotate || {};
            parsed.rotate.x = words[ i + 1 ];
            break;

          case 'spin':
          case 'yaw':
            parsed.rotate   = parsed.rotate || {};
            parsed.rotate.y = words[ i + 1 ];
            break;

          case 'roll':
            parsed.rotate   = parsed.rotate || {};
            parsed.rotate.z = words[ i + 1 ];
            break;

          case 'reset':

            if ( words[ i - 1 ] == 'no' ){
              parsed.reset = false;
            } else {
              parsed.reset = true;
            }
            break;

          case 'scale':

            parsed.scale = {};

            if ( words[ i + 1 ] == 'up' || words[ i + 1 ] == 'down' ){

              parsed.scale.direction = words[ i + 1 ];
              parsed.scale.power     = words[ i + 2 ];
              break;
            }

            parsed.scale.power = words[ i + 1 ];
            break;

          case 'vFactor':
          case 'vF':
            parsed.vFactor = words[ i + 1 ];
            break;

          case 'opacity':
            parsed.opacity = words[ i + 1 ];
            break;

          default:
            return;
        }
      });

      // Build default config object, then apply any keywords parsed from the
      // data-sr attribute.
      config = _extend( config, self.config );
      config = _extend( config, parsed );

      if ( config.enter === 'top' || config.enter === 'bottom' ){
        config.axis = 'Y';
      } else if ( config.enter === 'left' || config.enter === 'right' ){
        config.axis = 'X';
      }

      // Let’s make sure our our pixel distances are negative for top and left.
      // e.g. "enter top and move 25px" starts at 'top: -25px' in CSS.
      if ( config.enter === 'top' || config.enter === 'left' ){
        config.move = '-' + config.move;
      }

      return config;
    },

    // Generates styles based on an elements configuration property.
    // @param {object} elem — An object from self.elems.
    // @return {object}
    styleFactory: function( elem ){

      var inline;
      var initial;
      var reset;
      var target;
      var transition;

      var cfg      = elem.config;
      var duration = ( parseFloat( cfg.over ) + parseFloat( cfg.wait ) ) * 1000;

      // Want to disable delay on mobile devices? Uncomment the line below.
      // if ( self.isMobile() && self.config.mobile ) cfg.wait = 0;

      if ( elem.domEl.getAttribute('style') ){
        inline = elem.domEl.getAttribute('style') + '; visibility: visible; ';
      } else {
        inline = 'visibility: visible; ';
      }

      transition = '-webkit-transition: -webkit-transform ' + cfg.over + ' ' + cfg.easing + ' ' + cfg.wait + ', opacity ' + cfg.over + ' ' + cfg.easing + ' ' + cfg.wait + '; ' +
                           'transition: transform '         + cfg.over + ' ' + cfg.easing + ' ' + cfg.wait + ', opacity ' + cfg.over + ' ' + cfg.easing + ' ' + cfg.wait + '; ' +
                  '-webkit-perspective: 1000;' +
          '-webkit-backface-visibility: hidden;';

      reset      = '-webkit-transition: -webkit-transform ' + cfg.over + ' ' + cfg.easing + ' 0s, opacity ' + cfg.over + ' ' + cfg.easing + ' 0s; ' +
                           'transition: transform '         + cfg.over + ' ' + cfg.easing + ' 0s, opacity ' + cfg.over + ' ' + cfg.easing + ' 0s; ' +
                  '-webkit-perspective: 1000; ' +
          '-webkit-backface-visibility: hidden; ';

      initial = 'transform:';
      target  = 'transform:';
      build();

      // Build again for webkit…
      initial += '-webkit-transform:';
      target  += '-webkit-transform:';
      build();

      return {
        transition: transition,
        initial:    initial,
        target:     target,
        reset:      reset,
        inline:     inline,
        duration:   duration
      };

      // Constructs initial and target styles.
      function build(){

        if ( parseInt( cfg.move ) !== 0 ){
          initial += ' translate' + cfg.axis + '(' + cfg.move + ')';
          target  += ' translate' + cfg.axis + '(0)';
        }

        if ( parseInt( cfg.scale.power ) !== 0 ){

          if ( cfg.scale.direction === 'up' ){
            cfg.scale.value = 1 - ( parseFloat( cfg.scale.power ) * 0.01 );
          } else if ( cfg.scale.direction === 'down' ){
            cfg.scale.value = 1 + ( parseFloat( cfg.scale.power ) * 0.01 );
          }

          initial += ' scale(' + cfg.scale.value + ')';
          target  += ' scale(1)';
        }

        if ( cfg.rotate.x ){
          initial += ' rotateX(' + cfg.rotate.x + ')';
          target  += ' rotateX(0)';
        }

        if ( cfg.rotate.y ){
          initial += ' rotateY(' + cfg.rotate.y + ')';
          target  += ' rotateY(0)';
        }

        if ( cfg.rotate.z ){
          initial += ' rotateZ(' + cfg.rotate.z + ')';
          target  += ' rotateZ(0)';
        }

        initial += '; opacity: ' + cfg.opacity + '; ';
        target  += '; opacity: 1; ';
      }
    },

    getViewportH: function(){

      var client = self.config.viewport['clientHeight'];
      var inner  = window['innerHeight'];

      if ( self.config.viewport === window.document.documentElement ){
        return ( client < inner ) ? inner : client;
      }

      return client;
    },

    scrollY: function(){
      if ( self.config.viewport === window.document.documentElement ){
        return window.pageYOffset;
      } else {
        return self.config.viewport.scrollTop + self.config.viewport.offsetTop;
      }
    },

    getOffset: function( el ){

      var offsetTop  = 0;
      var offsetLeft = 0;

      do {
        if ( !isNaN( el.offsetTop ) ){
          offsetTop  += el.offsetTop;
        }
        if ( !isNaN( el.offsetLeft ) ){
          offsetLeft += el.offsetLeft;
        }
      } while ( el = el.offsetParent );

      return {
        top: offsetTop,
        left: offsetLeft
      };
    },

    isElemInViewport: function( elem ){

      var elHeight = elem.domEl.offsetHeight;
      var elTop    = self.getOffset( elem.domEl ).top;
      var elBottom = elTop + elHeight;
      var vFactor  = elem.config.vFactor || 0;

      return ( confirmBounds() || isPositionFixed() );

      function confirmBounds(){

        var top        = elTop + elHeight * vFactor;
        var bottom     = elBottom - elHeight * vFactor;
        var viewBottom = self.scrolled + self.getViewportH();
        var viewTop    = self.scrolled;

        return ( top < viewBottom ) && ( bottom > viewTop );
      }

      function isPositionFixed(){

        var el    = elem.domEl;
        var style = el.currentStyle || window.getComputedStyle( el, null );

        return style.position === 'fixed';
      }
    },

    isMobile: function(){

      var agent = navigator.userAgent || navigator.vendor || window.opera;

      return (/(ipad|playbook|silk|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test( agent )||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( agent.substr( 0, 4 ))) ? true : false;
    },

    isSupported: function(){

      var sensor    = document.createElement('sensor');
      var cssPrefix = 'Webkit,Moz,O,'.split(',');
      var tests     = ( 'transition ' + cssPrefix.join('transition,') ).split(',');

      for ( var i = 0; i < tests.length; i++ ){
        if ( !sensor.style[tests[i]] === '' ){
          return false;
        }
      }

      return true;
    },

    destroy: function(){

      var node = self.config.viewport;
      var query = Array.prototype.slice.call( node.querySelectorAll('[data-sr]') );

      query.forEach(function( el ){
        el.removeAttribute('data-sr');
      });
    }
  } // End of the scrollReveal prototype ======================================|

  _handler = function( e ){

    if ( !self.blocked ){

      self.blocked  = true;
      self.scrolled = self.scrollY();

      _requestAnimFrame(function(){
        self.animate();
      });
    }
  }

  _extend = function( target, src ){

    for ( var prop in src ){
      if ( src.hasOwnProperty( prop ) ){
        target[ prop ] = src[ prop ];
      }
    }

    return target;
  }

  // RequestAnimationFrame polyfill.
  _requestAnimFrame = (function(){

    return window.requestAnimationFrame        ||
           window.webkitRequestAnimationFrame  ||
           window.mozRequestAnimationFrame     ||

          function( callback ){
            window.setTimeout( callback, 1000 / 60 );
          };
  }());

  return scrollReveal;

})( window );

return scrollReveal;

}));

/*!
 * smoothState.js is jQuery plugin that progressively enhances
 * page loads to behave more like a single-page application.
 *
 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
 * @see     http://smoothstate.com
 *
 */
!function(t,n,o,e){"use strict";if(!n.history.pushState)return t.fn.smoothState=function(){return this},void(t.fn.smoothState.options={});if(!t.fn.smoothState){var r=t("html, body"),a=n.console,i={debug:!1,anchors:"a",forms:"form",blacklist:".no-smoothState",prefetch:!1,prefetchOn:"mouseover touchstart",cacheLength:0,loadingClass:"is-loading",alterRequest:function(t){return t},onBefore:function(t,n){},onStart:{duration:0,render:function(t){}},onProgress:{duration:0,render:function(t){}},onReady:{duration:0,render:function(t,n){t.html(n)}},onAfter:function(t,n){}},s={isExternal:function(t){var o=t.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof o[1]&&o[1].length>0&&o[1].toLowerCase()!==n.location.protocol?!0:"string"==typeof o[2]&&o[2].length>0&&o[2].replace(new RegExp(":("+{"http:":80,"https:":443}[n.location.protocol]+")?$"),"")!==n.location.host?!0:!1},stripHash:function(t){return t.replace(/#.*/,"")},isHash:function(t,o){o=o||n.location.href;var e=t.indexOf("#")>-1?!0:!1,r=s.stripHash(t)===s.stripHash(o)?!0:!1;return e&&r},translate:function(n){var o={dataType:"html",type:"GET"};return n="string"==typeof n?t.extend({},o,{url:n}):t.extend({},o,n)},shouldLoadAnchor:function(t,n){var o=t.prop("href");return!(s.isExternal(o)||s.isHash(o)||t.is(n)||t.prop("target"))},clearIfOverCapacity:function(t,n){return Object.keys||(Object.keys=function(t){var n,o=[];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&o.push(n);return o}),Object.keys(t).length>n&&(t={}),t},storePageIn:function(n,o,e,r){var a=t(e);return n[o]={status:"loaded",title:a.filter("title").first().text(),html:a.filter("#"+r)},n},triggerAllAnimationEndEvent:function(n,o){o=" "+o||"";var e=0,r="animationstart webkitAnimationStart oanimationstart MSAnimationStart",a="animationend webkitAnimationEnd oanimationend MSAnimationEnd",i="allanimationend",l=function(o){t(o.delegateTarget).is(n)&&(o.stopPropagation(),e++)},u=function(o){t(o.delegateTarget).is(n)&&(o.stopPropagation(),e--,0===e&&n.trigger(i))};n.on(r,l),n.on(a,u),n.on("allanimationend"+o,function(){e=0,s.redraw(n)})},redraw:function(t){t.height()}},l=function(o){if(null!==o.state){var e=n.location.href,r=t("#"+o.state.id),a=r.data("smoothState");a.href===e||s.isHash(e,a.href)||a.load(e,!1)}},u=function(e,i){var l=t(e),u=l.prop("id"),c=null,f=!1,h={},d=n.location.href,p=function(t){t=t||!1,t&&h.hasOwnProperty(t)?delete h[t]:h={},l.data("smoothState").cache=h},g=function(n,o){o=o||t.noop;var e=s.translate(n);if(!h.hasOwnProperty(e.url)||"undefined"!=typeof e.data){h=s.clearIfOverCapacity(h,i.cacheLength),h[e.url]={status:"fetching"};var r=t.ajax(e);r.success(function(t){s.storePageIn(h,e.url,t,u),l.data("smoothState").cache=h}),r.error(function(){h[e.url].status="error"}),o&&r.complete(o)}},m=function(){if(c){var n=t(c,l);if(n.length){var e=n.offset().top;o.body.scrollTop=e}c=null}},y=function(e){var s="#"+u,c=h[e]?t(h[e].html.html()):null;c.length?(o.title=h[e].title,l.data("smoothState").href=e,i.loadingClass&&r.removeClass(i.loadingClass),i.onReady.render(l,c),l.one("ss.onReadyEnd",function(){f=!1,i.onAfter(l,c),m()}),n.setTimeout(function(){l.trigger("ss.onReadyEnd")},i.onReady.duration)):!c&&i.debug&&a?a.warn("No element with an id of "+s+" in response from "+e+" in "+h):n.location=e},v=function(t,o){var e=s.translate(t);"undefined"==typeof o&&(o=!0);var c=!1,f=!1,d={loaded:function(){var t=c?"ss.onProgressEnd":"ss.onStartEnd";f&&c?f&&y(e.url):l.one(t,function(){y(e.url)}),o&&n.history.pushState({id:u},h[e.url].title,e.url)},fetching:function(){c||(c=!0,l.one("ss.onStartEnd",function(){i.loadingClass&&r.addClass(i.loadingClass),i.onProgress.render(l),n.setTimeout(function(){l.trigger("ss.onProgressEnd"),f=!0},i.onProgress.duration)})),n.setTimeout(function(){h.hasOwnProperty(e.url)&&d[h[e.url].status]()},10)},error:function(){i.debug&&a?a.log("There was an error loading: "+e.url):n.location=e.url}};h.hasOwnProperty(e.url)||g(e),i.onStart.render(l),n.setTimeout(function(){r.scrollTop(0),l.trigger("ss.onStartEnd")},i.onStart.duration),d[h[e.url].status]()},S=function(n){var o,e=t(n.currentTarget);s.shouldLoadAnchor(e,i.blacklist)&&!f&&(n.stopPropagation(),o=s.translate(e.prop("href")),o=i.alterRequest(o),g(o))},w=function(n){var o=t(n.currentTarget);if(!n.metaKey&&!n.ctrlKey&&s.shouldLoadAnchor(o,i.blacklist)){var e=s.translate(o.prop("href"));f=!0,n.stopPropagation(),n.preventDefault(),c=o.prop("hash"),e=i.alterRequest(e),i.onBefore(o,l),v(e)}},E=function(n){var o=t(n.currentTarget);if(!o.is(i.blacklist)){n.preventDefault(),n.stopPropagation();var e={url:o.prop("action"),data:o.serialize(),type:o.prop("method")};f=!0,e=i.alterRequest(e),"get"===e.type.toLowerCase()&&(e.url=e.url+"?"+e.data),i.onBefore(o,l),v(e)}},b=function(t){t.on("click",i.anchors,w),t.on("submit",i.forms,E),i.prefetch&&t.on(i.prefetchOn,i.anchors,S)},P=function(){var t=l.prop("class");l.removeClass(t),s.redraw(l),l.addClass(t)};return i=t.extend({},t.fn.smoothState.options,i),null===n.history.state&&n.history.replaceState({id:u},o.title,d),s.storePageIn(h,d,o.documentElement.outerHTML,u),s.triggerAllAnimationEndEvent(l,"ss.onStartEnd ss.onProgressEnd ss.onEndEnd"),b(l),{href:d,cache:h,clear:p,load:v,fetch:g,restartCSSAnimations:P}},c=function(n){return this.each(function(){var o=this.tagName.toLowerCase();this.id&&"body"!==o&&"html"!==o&&!t.data(this,"smoothState")?t.data(this,"smoothState",new u(this,n)):!this.id&&a?a.warn("Every smoothState container needs an id but the following one does not have one:",this):"body"!==o&&"html"!==o||!a||a.warn("The smoothstate container cannot be the "+this.tagName+" tag")})};n.onpopstate=l,t.smoothStateUtility=s,t.fn.smoothState=c,t.fn.smoothState.options=i}}(jQuery,window,document);
