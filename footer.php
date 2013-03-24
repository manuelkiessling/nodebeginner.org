<?php

$output = ob_get_clean(); // Gesamte Ausgabe, die an den Client gesendet werden soll, abfangen und zwischenspeichern

$etag = '"'.sha1($output).'"'; // Prüfsumme der Ausgabe berechnen// Ist der Inhalt identisch mit dem, den der Client gecached hat?

if ($_SERVER['HTTP_IF_NONE_MATCH'] == $etag) // Wenn ja, dann sende nur den Status 304
{
    header('HTTP/1.x 304 Not Modified');
    header('Etag: '.$etag);
    die();
}
else // Wenn nicht, dann sende den Inhalt inkl. des neuen Etags
{
    header('Etag: '.$etag);
    echo $output;
    die();
}
