/**
 * Created by westp on 3/6/17.
 */

const imageQuery = [
    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
    " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    " PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    " PREFIX tw: <http://tw.rpi.edu/schema/>",
    " PREFIX twi: <http://tw.rpi.edu/instances/>",
    " PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
    " ",
    " DESCRIBE <http://tw.rpi.edu/instances/PatrickWest> ?pic",
    " WHERE {",
    "   OPTIONAL {",
    "     <http://tw.rpi.edu/instances/PatrickWest> foaf:depiction ?pic .",
    "   }",
    " }"
].join('');

const descriptionQuery = [
    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
    " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    " PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    " PREFIX tw: <http://tw.rpi.edu/schema/>",
    " PREFIX twi: <http://tw.rpi.edu/instances/>",
    " PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
    " ",
    " DESCRIBE <http://tw.rpi.edu/instances/PatrickWest>"
].join('');

const interestQuery = [
    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
    " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    " PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    " PREFIX tw: <http://tw.rpi.edu/schema/>",
    " PREFIX twi: <http://tw.rpi.edu/instances/>",
    " PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
    " ",
    " DESCRIBE ?interest",
    " WHERE {",
    "   OPTIONAL {",
    "     <http://tw.rpi.edu/instances/PatrickWest> tw:hasInterest ?interest .",
    "   }",
    " }"
].join('');

const publicationListQuery = [
    "PREFIX tw:   <http://tw.rpi.edu/schema/>",
    " PREFIX time: <http://www.w3.org/2006/time#>",
    " SELECT distinct ?s",
    " WHERE",
    " { <http://tw.rpi.edu/instances/PatrickWest> tw:hasRole ?role .",
    "     ?s tw:hasAgentWithRole ?role .",
    "     ?s a tw:Publication .",
    "     ?s tw:hasDate ?dateObj .",
    "     ?dateObj time:inXSDDateTime ?date .",
    " } ORDER BY DESC(?date)"
].join('');

const publicationQuery = [
"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
" PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
" PREFIX owl: <http://www.w3.org/2002/07/owl#>",
" PREFIX tw: <http://tw.rpi.edu/schema/>",
" PREFIX twi: <http://tw.rpi.edu/instances/>",
" PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
" ",
" DESCRIBE <PUBLICATION> ?person ?event ?super ?journal",
" WHERE {",
"     OPTIONAL {",
"         <PUBLICATION> tw:hasAgentWithRole ?thisauthor .",
"         <PUBLICATION> tw:hasDate ?date .",
"         <PUBLICATION> tw:hasAgentWithRole ?coauthor .",
"         ?person tw:hasRole ?coauthor .",
"         OPTIONAL {",
"             <PUBLICATION> tw:inEvent ?event .",
"             OPTIONAL {",
"                 ?event tw:inEvent ?super",
"             }",
"         }",
"         OPTIONAL {",
"             <PUBLICATION> tw:inPublication ?journal .",
"         }",
"     }",
" }"
].join('');

const presentationListQuery = [
    "PREFIX tw:   <http://tw.rpi.edu/schema/>",
    " PREFIX time: <http://www.w3.org/2006/time#>",
    " SELECT distinct ?s",
    " WHERE",
    " { <http://tw.rpi.edu/instances/PatrickWest> tw:hasRole ?role .",
    "     ?s tw:hasAgentWithRole ?role .",
    "     ?s a tw:Presentation .",
    "     ?s tw:hasDate ?dateObj .",
    "     ?dateObj time:inXSDDateTime ?date .",
    " } ORDER BY DESC(?date)"
].join('');

const presentationQuery = [
    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
    " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    " PREFIX owl: <http://www.w3.org/2002/07/owl#>",
    " PREFIX tw: <http://tw.rpi.edu/schema/>",
    " PREFIX twi: <http://tw.rpi.edu/instances/>",
    " PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
    " ",
    " DESCRIBE <PRESENTATION> ?person ?event ?super",
    " WHERE {",
    "     <PRESENTATION> tw:hasDate ?date .",
    "     <PRESENTATION> tw:hasAgentWithRole ?coauthor .",
    "     ?person tw:hasRole ?coauthor .",
    "     OPTIONAL {",
    "         <PRESENTATION> tw:inEvent ?event .",
    "         OPTIONAL {",
    "             ?event tw:inEvent ?super",
    "         }",
    "     }",
    " }"
].join('');

