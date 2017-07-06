<?php

if (!isset($_SERVER['HTTPS'])) {
    header('HTTP/1.1 301 Moved Permanently');
    header(
        'Location: https://www.nodebeginner.org'
        . $_SERVER['REQUEST_URI']
    );
    die();
}

if ($_SERVER['HTTP_HOST'] == 'nodebeginner.org') {
    header('HTTP/1.1 301 Moved Permanently');
    header(
        'Location: https://www.nodebeginner.org'
        . $_SERVER['REQUEST_URI']
    );
    die();
}

if (   $_SERVER['REQUEST_URI'] === '/blog/post/'
    || $_SERVER['REQUEST_URI'] === '/blog/post'
    || $_SERVER['REQUEST_URI'] === '/blog/post/index.html')
{
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: https://www.nodebeginner.org/blog/');
    die();
}

if (   $_SERVER['REQUEST_URI'] === '/web-development-beginner-tutorial/post/'
    || $_SERVER['REQUEST_URI'] === '/web-development-beginner-tutorial/post'
    || $_SERVER['REQUEST_URI'] === '/web-development-beginner-tutorial/post/index.html')
{
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: https://www.nodebeginner.org/web-development-beginner-tutorial/');
    die();
}


ob_start();

$httpHost = $_SERVER['HTTP_HOST'];
$requestUri = $_SERVER['REQUEST_URI'];
$queryString = $_SERVER['QUERY_STRING'];

$pathinfo = pathinfo($_ENV['SCRIPT_FILENAME']);
$extension = $pathinfo['extension'];

if ($extension != 'html') {
    header('Expires: ' . gmdate('D, d M Y H:i:s T', time() + 604800)); // 1 week
}

if ($extension == 'html') {
    header('Content-type: text/html; charset=utf-8');
}

if ($extension == 'css') {
    header('Content-type: text/css; charset=utf-8');
}

if ($extension == 'js') {
    header('Content-type: text/javascript; charset=utf-8');
}

if ($extension == 'png') {
    header('Content-type: image/png');
}

if ($extension == 'jpg') {
    header('Content-type: image/jpeg');
}

if ($extension == 'gif') {
    header('Content-type: image/gif');
}


header('X-Went-Through-Header-File: yes');
