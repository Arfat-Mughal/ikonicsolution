<!DOCTYPE html>
<html>
<head>
    <title>Megacrafter contact form</title>
</head>
<body>
    <h1>Name : {{ $details['name'] }}</h1>
    <p>Email : {{ $details['email'] }}</p>
    <p>Subject : {{ isset($details['subject']) ? $details['subject'] : 'none'}}</p>
    <p>Comment : {{ $details['comments'] }}</p>

    <p>Thank you</p>
</body>
</html>
