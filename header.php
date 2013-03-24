<?php

ob_start();

$httpHost = $_SERVER['HTTP_HOST'];
$requestUri = $_SERVER['REQUEST_URI'];
$queryString = $_SERVER['QUERY_STRING'];

if ($httpHost === 'nodebeginner.org') {
  $location = 'http://www.nodebeginner.org'.$requestUri;
  header('HTTP/1.1 301 Moved Permanently');
  header('Location: '.$location);
  die();
}

if (substr($requestUri, 0, 11) === '/index.html') {
  $location = 'http://'.$httpHost.'/';
  if ($queryString !== '') {
    $location .= '?'.$queryString;
  }
  header('HTTP/1.1 301 Moved Permanently');
  header('Location: '.$location);
  die();
}

$pathinfo = pathinfo($_ENV['SCRIPT_FILENAME']);
$extension = $pathinfo['extension'];

if ($extension != 'html') {
    header('Cache-Control: max-age=604800'); // 1 week
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
