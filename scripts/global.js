window.onload = function () {
    var hash = window.location.hash;
    if (hash) {
        hash = hash.substr(1);
        include(hash);
    } else {
        include();
    }
}

window.onhashchange = function() {
    var hash = window.location.hash;
    if (hash) {
        hash = hash.substr(1);
        include(hash);
    } else {
        include();
    }
}

function navigate(hash, path) {
    window.location.hash = hash;
    document.getElementById('content').setAttribute('data-include', path);
    include(hash);
}

function include(hash) {
	var elem = document.getElementById('content');

    if (hash) {
        var url = 'views/' + hash + '.html';
    } else {
        var url = 'views/navigation.html';
    }
	var localTest = /^(?:file):/,
		xmlhttp = new XMLHttpRequest(),
		status = 0;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			status = xmlhttp.status;
		}
		if (localTest.test(location.href) && xmlhttp.responseText) {
			status = 200;
		}
		if (xmlhttp.readyState == 4 && status == 200) {
			elem.outerHTML = xmlhttp.responseText;
		}
	}

	try {
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	} catch(err) {
		/* todo catch error */
	}
}
