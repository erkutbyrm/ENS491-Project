# Prediction with UniProt ID list

**URL** : `/api/predict/gene-id`

**Method** : `POST`


## Input Format
**Content-Type** : JSON
```json
{
  "geneList":[
    {
      "gene":"[uniProtId_1]",
      "positions":[13,22]
    },
    {
      "gene":"[uniProtId_2]",
      "positions":[]
    },
  ],
  "omitErrors":<true/false>
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
**Condition** : If there are invalid UniProt ID's or positions, and omitErrors is false

**Code** : `400 Bad Request`

**Content**
```json
{
  "invalid_ids": "[invalid_ids]",
  "invalid_positions": "[invalid_positions]",
  "error": "invalid_id_pos"
}
```
---
**Condition** : If input list is empty

**Code** : `400 Bad Request`

**Content**
```json
{
    "error": "empty_test_data"
}
```
