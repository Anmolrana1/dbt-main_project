{{ config(
    tags=['basic', 'staging']
) }}

-- Extracting Required Fields
WITH Certificate_Data AS (
    SELECT
        Empid,
        certificateName,
        issueDate,
        Status

    FROM {{ source('Skill_matrix', 'Certificate_Data') }}
)

SELECT * from Certificate_Data;