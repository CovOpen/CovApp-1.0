<!DOCTYPE html>
<html lang="en">
<head>
    <?php include("includes/head.php"); ?>
    <script type="text/javascript" src="js/html2canvas.min.js"></script>
    <script src="https://maps.google.com/maps?file=api&amp;v=2&amp;key=AIzaSyARMzfB7gzrHdvhZ2kD7HNKDXYdZOOuTbY" type="text/javascript"></script>
    <script type="text/javascript">

    </script>
</head>

<body onload="initialize()" onunload="GUnload()">
<div id="map" style="width: 600px; height: 400px"></div>
<form action="#" onsubmit="saveMap(); return false">
<input type="submit" value="Save" />
</form>

</body>
</html>
