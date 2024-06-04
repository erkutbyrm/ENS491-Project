# Prediction with FASTA string

**URL** : `/api/predict/sequence-string`

**Method** : `POST`


## Input Format
**Content-Type** : JSON
```json
{
    "fasta": "[input string in FASTA format]",
    "aminoacids": "[list of amino acids to scan for, subset of ['S', 'T', 'Y', 'H']]",
    "omitErrors": false
}
```
## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "results": [
    {
      "geneId": "[ID of query gene 1]",
      "position": "[position of phosphosite residue]",
      "proteinSeq": "[phosphosite residue ±7 amino acids]",
      "probKinase": "[most probable 5 kinases in descending order with respect to their probabilities]",
      "probability": "[prediction probabilities of the most probable 5 kinases]",
      "kinaseFamily": "[families of the most probable 5 kinases]",
      "kinaseGroup": "[groups of the most probable 5 kinases]"
    },
    {
      "geneId": "[ID of query gene 2]",
      "position": "[position of phosphosite residue]",
      "proteinSeq": "[phosphosite residue ±7 amino acids]",
      "probKinase": "[most probable 5 kinases in descending order with respect to their probabilities]",
      "probability": "[prediction probabilities of the most probable 5 kinases]",
      "kinaseFamily": "[families of the most probable 5 kinases]",
      "kinaseGroup": "[groups of the most probable 5 kinases]"
    }
  ]
}
```

## Error Responses
**Condition** : If the "aminoacids" field in the request is unspecified or an empty list.

**Code** : `400 Bad Request`

**Content**
```json
{
    "error": "no_target_selected"
}
```
---
**Condition** : If a protein sequence is shorter than 10 amino acids.

**Code** : `400 Bad Request`

**Content**
```json
{
    "invalid_ids": "[ids of the short sequences]",
    "error": "short_seq"
}
```
---
**Condition** : If no protein in FASTA format is found in the uploaded file.

**Code** : `400 Bad Request`

**Content**
```json
{
    "error": "incorrect_format"
}
```
---
**Condition** : If a protein sequence contains an invalid character i.e. any character except single letter codes of the amino acids or 'X'.

**Code** : `400 Bad Request`

**Content**
```json
{
    "invalid_ids": "[ids of the sequences containing invalid characters]",
    "error": "invalid_aa_seq"
}
```
---
**Condition** : If none of the target amino acids are present in the sequences.

**Code** : `400 Bad Request`

**Content**
```json
{
    "error": "no_site"
}
```