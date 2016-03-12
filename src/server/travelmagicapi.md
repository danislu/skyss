

# Opplisting av lokasjoner
Type: 0/Utelatt = Alle, 1 = bare  holdeplasser,  2  =  bare adresser, 3 = bare steder

/v1LocationXML?filter=stav&cnt=25&type=1

# Opplisting av hpl/sted innefor geografisk område

/v1AreaXML?
    X1=5.5707550048828125&
    x2=6.0582733154296875&
    y1=58.78243831441903&
    y2=58.94221578966931&
    max=120

# Nærmeste lokasjon til koordinat punkt

X og Y koordinater:
/v1PointXML?y= 58.943081&x=5.658998

Lokasjonsnavn:
/v1PointXML?name=Madlasandnes [adresse]

# Nærmeste holdeplasser til et navngitt punkt via veg

/v1PointStageXML?name=Madlasandnes [adresse]

# Søk og søkeresultat
/v1SearchXML?
    From=Madlasandnes+(Stavanger)+[holdeplass]&
    to=11024308,+[hpl.gruppe]&
    instant=1

(Ny i TM 3)
/V1SearchXML?
    From=11031362,15&
    to=11024308,20

# Avgangliste fra holdeplass
/v1DepartureXML?hpl=11031362

# Opplisting av lokasjoner
/v2LocationXML
