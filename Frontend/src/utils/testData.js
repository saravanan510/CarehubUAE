const testData = [
  {
    name: "Vitamin D, 25-hydroxy (25-OH Cholecalciferol) Total - 82306",
    id: 1,
    price: 67,
  },
  {
    name: "17-Hydroxy Progesterone level",
    id: 2,
    price: 72,
  },
  {
    name: "Absolute Eosinophil Count",
    id: 3,
    price: 66,
  },
  {
    name: "Absolute Neutrophil Count",
    id: 4,
    price: 66,
  },
  {
    name: "Allergen Screening- Food (44 panel), Serum",
    id: 5,
    price: 200,
  },
  {
    name: "Allergen Screening- inhalant (44 panel), Serum",
    id: 6,
    price: 200,
  },
  {
    name: "Alpha Feto Protein level",
    id: 7,
    price: 69,
  },
  {
    name: "Amylase Pancreatic, Serum",
    id: 8,
    price: 85,
  },
  {
    name: "Amylase-Serum",
    id: 9,
    price: 61,
  },
  {
    name: "ANA 25",
    id: 10,
    price: 73,
  },
  {
    name: "Anti Thyroid Antibody",
    id: 11,
    price: 125,
  },
  {
    name: "Autoimmune Hepatitis Profile (EIA)",
    id: 12,
    price: 450,
  },
  {
    name: "B - 2 Microglobulin level - serum",
    id: 13,
    price: 110,
  },
  {
    name: "B - Type Natriuretic Peptide(BNP)",
    id: 14,
    price: 185,
  },
  {
    name: "Bilirubin Direct, Serum - 82248",
    id: 15,
    price: 65,
  },
  {
    name: "Bilirubin Indirect, Serum - 82247",
    id: 16,
    price: 65,
  },
  {
    name: "Bilirubin level Total",
    id: 17,
    price: 60,
  },
  {
    name: "Blood Group & RH ( Forward and Reverse )",
    id: 18,
    price: 82,
  },
  {
    name: "Blood Urea Nitrogen (BUN)",
    id: 19,
    price: 60,
  },
  {
    name: "C- Reactive Protein",
    id: 20,
    price: 61,
  },
  {
    name: "C.A.-125 level",
    id: 21,
    price: 69,
  },
  {
    name: "C.M.V antibody IgG",
    id: 22,
    price: 69,
  },
  {
    name: "C.M.V. antibody IgM",
    id: 23,
    price: 69,
  },
  {
    name: "CA-19-9 level",
    id: 24,
    price: 70,
  },
  {
    name: "Calcium",
    id: 25,
    price: 61,
  },
  {
    name: "Carcino Embryonic Antigen level",
    id: 26,
    price: 66,
  },
  {
    name: "Cardiolipin antibody IgA",
    id: 27,
    price: 110,
  },
  {
    name: "Cardiolipin antibody IgG & IgM",
    id: 28,
    price: 140,
  },
  {
    name: "Cholesterol",
    id: 29,
    price: 65,
  },
  {
    name: "Coombs Test Direct (By Gel Technology)",
    id: 30,
    price: 85,
  },
  {
    name: "Coombs Test Indirect (By Gel Technology)",
    id: 31,
    price: 85,
  },
  {
    name: "Cortisol 8 AM",
    id: 32,
    price: 70,
  },
  {
    name: "C-Peptide level",
    id: 33,
    price: 70,
  },
  {
    name: "CPK Total",
    id: 34,
    price: 61,
  },
  {
    name: "CPK-MB level",
    id: 35,
    price: 68,
  },
  {
    name: "Creatinine",
    id: 36,
    price: 60,
  },
  {
    name: "Dengue antibody IgG & IgM-Elisa",
    id: 37,
    price: 150,
  },
  {
    name: "Dengue Antigen (NS1)- Rapid - 87449",
    id: 38,
    price: 95,
  },
  {
    name: "Dengue Antigen NS1 Elisa",
    id: 39,
    price: 100,
  },
  {
    name: "Double Marker",
    id: 40,
    price: 180,
  },
  {
    name: "Electrolytes",
    id: 41,
    price: 60,
  },
  {
    name: "Fasting Insulin & Glucose",
    id: 42,
    price: 105,
  },
  {
    name: "Ferritin",
    id: 43,
    price: 61,
  },
  {
    name: "Flu a, Flu B and H1N1 Qualitative by Real-time PCR",
    id: 44,
    price: 500,
  },
  {
    name: "Folic Acid level",
    id: 45,
    price: 90,
  },
  {
    name: "Follicle Stimulating Hormone level",
    id: 46,
    price: 62,
  },
  {
    name: "Free Beta HCG level",
    id: 47,
    price: 95,
  },
  {
    name: "Free Prostate Specific Antigen",
    id: 48,
    price: 61,
  },
  {
    name: "Free Testosterone",
    id: 49,
    price: 65,
  },
  {
    name: "Free Thyroxine(Free T4)",
    id: 50,
    price: 68,
  },
  {
    name: "Free Triiodothyronine(Free T3)",
    id: 51,
    price: 68,
  },
  {
    name: "Glucose – Fasting",
    id: 52,
    price: 65,
  },
  {
    name: "Glucose - Post Prandial",
    id: 53,
    price: 64,
  },
  {
    name: "Glucose – Random",
    id: 54,
    price: 64,
  },
  {
    name: "Glyco Hemoglobin (HBA1C)",
    id: 55,
    price: 67,
  },
  {
    name: "Haemoglobin",
    id: 56,
    price: 66,
  },
  {
    name: "Haemogram (CBC)",
    id: 57,
    price: 67,
  },
  {
    name: "Haemogram with ESR (CBC-ESR)",
    id: 58,
    price: 75,
  },
  {
    name: "HB Electrophoresis ( Capillary )",
    id: 59,
    price: 110,
  },
  {
    name: "HAV antibody IgM",
    id: 60,
    price: 95,
  },
  {
    name: "HBs antigen",
    id: 61,
    price: 90,
  },
  {
    name: "HBV (Hepatitis B) Qualitative by Real-time PCR",
    id: 62,
    price: 350,
  },
  {
    name: "HCV (Hepatitis C) Qualitative by Real-time PCR",
    id: 63,
    price: 400,
  },
  {
    name: "HCV antibody IgM",
    id: 64,
    price: 140,
  },
  {
    name: "High Sensitive CRP",
    id: 65,
    price: 66,
  },
  // {
  //   name: "HIV I & II",
  //   id: 66,
  //   price: 120,
  // },
  {
    name: "Homocysteine level",
    id: 67,
    price: 68,
  },
  {
    name: "HSV I Profile",
    id: 68,
    price: 95,
  },
  {
    name: "HSV II Profile",
    id: 69,
    price: 95,
  },
  {
    name: "IgA level",
    id: 70,
    price: 90,
  },
  {
    name: "IgE level",
    id: 71,
    price: 90,
  },
  {
    name: "Iron Profile",
    id: 72,
    price: 85,
  },
  {
    name: "Iron Studies (TIBC)",
    id: 73,
    price: 75,
  },
  {
    name: "Leutinizing Hormone level",
    id: 74,
    price: 63,
  },
  {
    name: "Lipase",
    id: 75,
    price: 64,
  },
  {
    name: "Lipid Profile",
    id: 76,
    price: 64,
  },
  {
    name: "Liver Function Test",
    id: 77,
    price: 63,
  },
  {
    name: "Magnesium Level",
    id: 78,
    price: 61,
  },
  {
    name: "Microalbumin Level from urine",
    id: 79,
    price: 64,
  },
  {
    name: "Occult Blood",
    id: 80,
    price: 72,
  },
  {
    name: "Osmolality Serum",
    id: 81,
    price: 105,
  },
  {
    name: "Osmolality Urine",
    id: 82,
    price: 105,
  },
  {
    name: "Para Thyroid Hormone Intact level",
    id: 83,
    price: 105,
  },
  {
    name: "Peripheral Smear",
    id: 84,
    price: 80,
  },
  {
    name: "Potassium",
    id: 85,
    price: 75,
  },
  {
    name: "Procalcitonin",
    id: 86,
    price: 250,
  },
  {
    name: "Progesterone level",
    id: 87,
    price: 63,
  },
  {
    name: "Prolactin level",
    id: 88,
    price: 63,
  },
  {
    name: "Prostate Specific Antigen level",
    id: 89,
    price: 61,
  },
  {
    name: "Prothrombin Time (Photooptical clot detection)",
    id: 90,
    price: 75,
  },
  {
    name: "Quadruple Marker",
    id: 91,
    price: 359,
  },
  {
    name: "Quantiferon TB Gold (IGRA)",
    id: 92,
    price: 300,
  },
  {
    name: "Renal Function Test",
    id: 93,
    price: 90,
  },
  {
    name: "Reticulocyte Count",
    id: 94,
    price: 75,
  },
  {
    name: "Rheumatoid Factor",
    id: 95,
    price: 67,
  },
  {
    name: "Rubella antibody IgG",
    id: 96,
    price: 66,
  },
  {
    name: "Rubella antibody IgM",
    id: 97,
    price: 120,
  },
  {
    name: "SGOT (AST)",
    id: 98,
    price: 65,
  },
  {
    name: "SGPT (ALT)",
    id: 99,
    price: 65,
  },
  {
    name: "Sodium",
    id: 100,
    price: 75,
  },
  {
    name: "Stool Examination",
    id: 101,
    price: 72,
  },
  {
    name: "Syphilis Antibody",
    id: 102,
    price: 80,
  },
  {
    name: "Testosterone level",
    id: 103,
    price: 65,
  },
  {
    name: "Thyroid Function Test",
    id: 104,
    price: 95,
  },
  {
    name: "Thyroid Function Test(Free)",
    id: 105,
    price: 100,
  },
  {
    name: "Thyroid Stimulating Immunoglobulin level",
    id: 106,
    price: 350,
  },
  {
    name: "Thyroperoxidase Antibody (Anti-TPO)",
    id: 107,
    price: 100,
  },
  {
    name: "Thyroxine Binding Globulin level",
    id: 108,
    price: 125,
  },
  {
    name: "Torch Complex (10 Parameters)",
    id: 109,
    price: 350,
  },
  {
    name: "TOTAL PROTEIN",
    id: 60,
    price: 24,
  },
  {
    name: "Transferrin Level",
    id: 111,
    price: 100,
  },
  {
    name: "Transferrin Saturation",
    id: 112,
    price: 75,
  },
  {
    name: "Triglyceride",
    id: 113,
    price: 60,
  },
  {
    name: "Troponin I",
    id: 114,
    price: 200,
  },
  {
    name: "Unsaturated Iron Binding Capacity",
    id: 115,
    price: 75,
  },
  {
    name: "Urea",
    id: 116,
    price: 65,
  },
  {
    name: "Uric Acid",
    id: 117,
    price: 60,
  },
  {
    name: "Urinary Protein-24 hours",
    id: 118,
    price: 85,
  },
  {
    name: "Urine Albumin",
    id: 119,
    price: 72,
  },
  {
    name: "Urine Examination",
    id: 120,
    price: 70,
  },
  {
    name: "Vitamin A",
    id: 121,
    price: 350,
  },
  {
    name: "Vitamin B - 12 Level",
    id: 122,
    price: 62,
  },
  {
    name: "Vitamin B1 (Thiamine)",
    id: 123,
    price: 350,
  },
  {
    name: "Vitamin B2 (Riboflavin)",
    id: 124,
    price: 350,
  },
  {
    name: "VITAMIN B3",
    id: 125,
    price: 550,
  },
  {
    name: "VITAMIN B5",
    id: 126,
    price: 550,
  },
  {
    name: "Vitamin B6",
    id: 127,
    price: 300,
  },
  {
    name: "Vitamin C",
    id: 128,
    price: 300,
  },
  {
    name: "Vitamin D - 1,25 Dihydroxy",
    id: 129,
    price: 300,
  },
  {
    name: "Vitamin E (Tocopherol)",
    id: 130,
    price: 350,
  },
  {
    name: "VITAMIN H (BIOTIN) (B7)",
    id: 131,
    price: 450,
  },
  {
    name: "VITAMIN K1",
    id: 132,
    price: 350,
  },
  {
    name: "XPERT HCV (HEPATITIS C VIRUS) VIRAL LOAD",
    id: 133,
    price: 400,
  },
  {
    name: "Zinc Level",
    id: 134,
    price: 73,
  },
  {
    name: "ACTH Level [Adrenocorticotropic hormone]",
    id: 135,
    price: 75,
  },
  {
    name: "Activated Partial Thromboplastin Time (Photooptical clot detection)",
    id: 136,
    price: 85,
  },
  {
    name: "Adenosine Deaminase From Blood",
    id: 137,
    price: 85,
  },
  {
    name: "Adenovirus antigen from Respiratory sample",
    id: 138,
    price: 200,
  },
  {
    name: "Adenovirus Qualitative by Real Time PCR",
    id: 139,
    price: 250,
  },
  {
    name: "ADH - Anti Diuretic Hormone",
    id: 140,
    price: 155,
  },
  {
    name: "AFB (ZN) stain for Sputum",
    id: 141,
    price: 75,
  },
  {
    name: "AFB Culture (MGIT)",
    id: 142,
    price: 130,
  },
  {
    name: "AFB stain",
    id: 143,
    price: 75,
  },
  {
    name: "Albumin-Serum",
    id: 144,
    price: 60,
  },
  {
    name: "Aldolase",
    id: 145,
    price: 125,
  },
  {
    name: "Aldosterone level",
    id: 146,
    price: 76,
  },
  {
    name: "Aldosterone to Renin Ratio",
    id: 147,
    price: 300,
  },
  {
    name: "Alkaline Phosphatase level",
    id: 148,
    price: 60,
  },
  {
    name: "Allergy-Penicillium chrysogenum m1",
    id: 149,
    price: 100,
  },
  {
    name: "Alpha 1 Antitrypsin",
    id: 150,
    price: 135,
  },
  {
    name: "Alpha Thalassemia - 81257",
    id: 151,
    price: 1500,
  },
  {
    name: "ALPHA-2- MACROGLOBULIN",
    id: 152,
    price: 400,
  },
  {
    name: "Aluminum level",
    id: 153,
    price: 250,
  },
  {
    name: "Anti CCP Level",
    id: 154,
    price: 79,
  },
  {
    name: "Anti ds DNA ( IIF )",
    id: 155,
    price: 120,
  },
  {
    name: "Anti ds DNA (ds DNA antibody) Qualitative Serum",
    id: 156,
    price: 110,
  },
  {
    name: "Anti Mullerian Hormone",
    id: 157,
    price: 94,
  },
  {
    name: "Anti MuSK Antibodies",
    id: 158,
    price: 550,
  },
  {
    name: "Anti Neutrophilic Cytoplasmic Antibodies ( IIF )",
    id: 159,
    price: 200,
  },
  {
    name: "Anti Neutrophilic Cytoplasmic Antibody (ELISA)",
    id: 160,
    price: 200,
  },
  {
    name: "Anti Nuclear Antibody ( IIF )",
    id: 161,
    price: 200,
  },
  {
    name: "Anti Phospholipid Antibody",
    id: 162,
    price: 200,
  },
  {
    name: "Anti Thrombin III",
    id: 163,
    price: 350,
  },
  {
    name: "Antibody screening for HLA Class I & II",
    id: 164,
    price: 600,
  },
  {
    name: "Antistreptolysin - O",
    id: 165,
    price: 85,
  },
  {
    name: "Apolipoprotein A - 1",
    id: 166,
    price: 67,
  },
  {
    name: "Apolipoprotein A-1+B",
    id: 167,
    price: 250,
  },
  {
    name: "Apolipoprotein B",
    id: 168,
    price: 67,
  },
  {
    name: "Aspergillosis antibody IgG",
    id: 169,
    price: 250,
  },
  {
    name: "Aspergillosis antibody IgM",
    id: 170,
    price: 250,
  },
  {
    name: "Aspergillus Antigen (Galactomannan)",
    id: 171,
    price: 250,
  },
  {
    name: "Bence Jones Protein",
    id: 172,
    price: 150,
  },
  {
    name: "Benzodiazepam",
    id: 173,
    price: 250,
  },
  {
    name: "Beta 2 Glycoprotein 1 antibody (IgG+IgM)",
    id: 174,
    price: 250,
  },
  {
    name: "Beta HCG level",
    id: 175,
    price: 63,
  },
  {
    name: "Beta Thal TRIO",
    id: 176,
    price: 1000,
  },
  {
    name: "Beta Thalassemia (5 Common Mutation)",
    id: 177,
    price: 450,
  },
  {
    name: "Bicarbonate",
    id: 178,
    price: 75,
  },
  {
    name: "BRCA1&2 by NGS (Germ-line)",
    id: 179,
    price: 1250,
  },
  {
    name: "CA-15-3 level",
    id: 180,
    price: 70,
  },
  {
    name: "Cancer marker profile-Breast",
    id: 181,
    price: 350,
  },
  {
    name: "Cancer marker profile-Colorectal",
    id: 182,
    price: 600,
  },
  {
    name: "Cancer marker profile-Ovary",
    id: 183,
    price: 400,
  },
  {
    name: "Cancer marker profile-Thyroid",
    id: 184,
    price: 700,
  },
  {
    name: "Carcino Embryonic Antigen level",
    id: 185,
    price: 90,
  },
  {
    name: "Catecholamine level-Plasma",
    id: 186,
    price: 400,
  },
  {
    name: "Catecholamine -Random Urine",
    id: 187,
    price: 400,
  },
  {
    name: "Ceruloplasmin level",
    id: 188,
    price: 120,
  },
  {
    name: "Chikungunya antibody IgM",
    id: 189,
    price: 105,
  },
  {
    name: "Chikungunya Qualitative by Real-time PCR",
    id: 190,
    price: 300,
  },
  {
    name: "Chloride",
    id: 191,
    price: 75,
  },
  {
    name: "Chlamydia Trachomatis Profile",
    id: 192,
    price: 300,
  },
  {
    name: "Copper Level",
    id: 193,
    price: 350,
  },
  {
    name: "Cortisol 2 Sample",
    id: 194,
    price: 100,
  },
  {
    name: " Creatinine Clearance Test",
    id: 195,
    price: 75,
  },
  {
    name: "DDimer",
    id: 196,
    price: 120,
  },
  {
    name: "Dehydroepiandrosterone (DHEA), Serum^",
    id: 197,
    price: 145,
  },
  {
    name: "Dihydrotestosterone level",
    id: 198,
    price: 105,
  },
  {
    name: "DMD Duchenne Muscular Dystrophy By MLPA",
    id: 199,
    price: 780,
  },
  {
    name: "Dopamine",
    id: 200,
    price: 300,
  },
  {
    name: "EBV (Epstein Barr Virus) Qualitative by Real-time PCR",
    id: 201,
    price: 400,
  },
  {
    name: "EBV antibody panel",
    id: 202,
    price: 380,
  },
  {
    name: "Encephalitis Panel ( Cell based study )",
    id: 203,
    price: 1400,
  },
  {
    name: "Erythropoetin level",
    id: 204,
    price: 250,
  },
  {
    name: "ESR",
    id: 205,
    price: 67,
  },
  {
    name: "Estradiol level",
    id: 206,
    price: 63,
  },
  {
    name: "Estriol level",
    id: 207,
    price: 200,
  },
  {
    name: "Factor II (Prothrombin) G20210A by Real-time PCR",
    id: 208,
    price: 400,
  },
  {
    name: "FACTOR V (Leiden) G1691A by Real-time PCR",
    id: 209,
    price: 450,
  },
  {
    name: "Fecal Calprotectin Level",
    id: 210,
    price: 300,
  },
  {
    name: "Fecal Elastase-1",
    id: 211,
    price: 450,
  },
  {
    name: "Fibrinogen Level ( Clauss Method )",
    id: 212,
    price: 250,
  },
  {
    name: " G6PD",
    id: 213,
    price: 200,
  },
  {
    name: "Gamma Glutamyl Transferase (GGT)",
    id: 214,
    price: 66,
  },
  {
    name: "Gastrointestinal Panel",
    id: 215,
    price: 1100,
  },
  {
    name: "GeneXpert-MTB/XDR",
    id: 216,
    price: 600,
  },
  {
    name: "GeneXpert-TB CB-NAAT",
    id: 217,
    price: 350,
  },
  {
    name: "GTT 3 Sample",
    id: 218,
    price: 150,
  },
  {
    name: "H. Pylori antibody IgG & IgA",
    id: 219,
    price: 150,
  },
  {
    name: "H. Pylori Antigen From Stool",
    id: 220,
    price: 120,
  },
  {
    name: "H.Pylori antibody IgM",
    id: 221,
    price: 200,
  },
  {
    name: "HDL Cholesterol",
    id: 222,
    price: 61,
  },
  {
    name: "Heparin/PF4 Antibody Test",
    id: 223,
    price: 450,
  },
  {
    name: "Hepatitis E Virus antibody IgM",
    id: 224,
    price: 260,
  },
  {
    name: "HEV (Hepatitis E) Qualitative by Real-time PCR",
    id: 225,
    price: 400,
  },
  {
    name: "HLA B 27 By Real-time PCR",
    id: 226,
    price: 350,
  },
  {
    name: "H-Pylori Urea Breath Test",
    id: 227,
    price: 350,
  },
  {
    name: "Immunoglobulin Profile (IgG, IgM, IgA)",
    id: 228,
    price: 350,
  },
  {
    name: "INFLUENZA VIRUS A IgG",
    id: 229,
    price: 350,
  },
  {
    name: "INFLUENZA VIRUS A IgM",
    id: 230,
    price: 300,
  },
  {
    name: "INFLUENZA VIRUS B IgG",
    id: 231,
    price: 300,
  },
  {
    name: "INFLUENZA VIRUS B IgM",
    id: 232,
    price: 300,
  },
  {
    name: "Iodine",
    id: 233,
    price: 600,
  },
  {
    name: "Ionic Calcium",
    id: 234,
    price: 85,
  },
  {
    name: "Jo - 1 antibody",
    id: 235,
    price: 140,
  },
  {
    name: "LDH",
    id: 236,
    price: 68,
  },
  {
    name: "LDL Cholesterol (Direct)",
    id: 237,
    price: 62,
  },
  {
    name: "Lipoprotein (a)",
    id: 238,
    price: 78,
  },
  {
    name: "Lipoprotein associated Phospholipase A2",
    id: 239,
    price: 80,
  },
  {
    name: "LUPUS ANTICOAGULANT (AS PER ISTH-2009)",
    id: 240,
    price: 200,
  },
  {
    name: "Malarial parasite ( smear )",
    id: 241,
    price: 75,
  },
  {
    name: "Measles Antibody IgG",
    id: 242,
    price: 95,
  },
  {
    name: "Measles Antibody IgM",
    id: 243,
    price: 95,
  },
  {
    name: "Mumps Antibody IgG & IgM",
    id: 244,
    price: 130,
  },
  {
    name: "Mumps antibody IgM",
    id: 245,
    price: 100,
  },
  {
    name: "Myoglobin level",
    id: 246,
    price: 105,
  },
  {
    name: "Neisseria Gonorrhoeae Qualitative by Real-time PCR",
    id: 247,
    price: 210,
  },
  {
    name: "New Born Screening 5",
    id: 248,
    price: 150,
  },
  {
    name: "New Born Screening 5 + Hemoglobinopathy",
    id: 249,
    price: 200,
  },
  {
    name: "New Born Screening 7",
    id: 250,
    price: 300,
  },
  {
    name: "New Born Screening-TSH",
    id: 251,
    price: 100,
  },
  {
    name: "Phosphorus Inorganic",
    id: 252,
    price: 61,
  },
  {
    name: "Platelet Count",
    id: 253,
    price: 66,
  },
  {
    name: "Protein With A/G Ratio",
    id: 254,
    price: 70,
  },
  {
    name: "Rapid Malarial Antigen ( Card ) - 87430",
    id: 255,
    price: 95,
  },
  {
    name: "Rapid Plasma Reagin (VDRL)",
    id: 256,
    price: 72,
  },
  {
    name: "Renin Level",
    id: 257,
    price: 300,
  },
  {
    name: "Reverse Triiodothyronine (Rev T3)",
    id: 258,
    price: 600,
  },
  {
    name: "Respiratory Pathogens Qualitative by Real-time PCR",
    id: 259,
    price: 950,
  },
  {
    name: "Salmonella Qualitative by Real-time PCR",
    id: 260,
    price: 350,
  },
  {
    name: "Scrub Typhus antibody IgM",
    id: 261,
    price: 250,
  },
  {
    name: "Serotonin-Serum",
    id: 262,
    price: 350,
  },
  {
    name: "Sex Hormone Binding Globulin level",
    id: 263,
    price: 69,
  },
  {
    name: "Sperm antibody",
    id: 264,
    price: 120,
  },
  {
    name: "SS-A/Ro antibody",
    id: 265,
    price: 115,
  },
  {
    name: "SS-B/La antibody",
    id: 266,
    price: 300,
  },
  {
    name: "STD 7",
    id: 267,
    price: 400,
  },
  {
    name: "STD 28",
    id: 268,
    price: 1400,
  },
  {
    name: "Thrombin Time",
    id: 269,
    price: 350,
  },
  {
    name: "Tissue Transglutaminase IgA (TTG-A)",
    id: 270,
    price: 180,
  },
  {
    name: "Tissue Transglutaminase IgG (TTG-G)",
    id: 271,
    price: 190,
  },
  {
    name: "Toxo antibody IgG",
    id: 272,
    price: 90,
  },
  {
    name: "Toxo antibody IgM",
    id: 273,
    price: 90,
  },
  {
    name: "Toxoplasma gondii Qualitative by Real-time PCR",
    id: 274,
    price: 350,
  },
  {
    name: "TPHA",
    id: 275,
    price: 80,
  },
  {
    name: "Triple Marker",
    id: 276,
    price: 350,
  },
  {
    name: "Tropical Fever Panel Qualitative by Real-Time PCR",
    id: 277,
    price: 500,
  },
  {
    name: "Urinary Albumin Creatinine ratio",
    id: 278,
    price: 75,
  },
  {
    name: "Urinary Cortisol- 24 hours",
    id: 279,
    price: 250,
  },
  {
    name: "Urinary Metanephrine -24 hours",
    id: 280,
    price: 400,
  },
  {
    name: "Urinary Protein Creatinine Ratio",
    id: 281,
    price: 85,
  },
  {
    name: "Urine metabolic screen for stone",
    id: 282,
    price: 400,
  },
  {
    name: "Urine Myoglobin",
    id: 283,
    price: 110,
  },
  {
    name: "Urine oxalate, 24 hrs",
    id: 284,
    price: 350,
  },
  {
    name: "Vanillylmandelic acid (VMA)",
    id: 285,
    price: 350,
  },
  {
    name: "Varicella Zoster antibody IgG",
    id: 286,
    price: 105,
  },
  {
    name: "Varicella Zoster antibody IgM",
    id: 287,
    price: 105,
  },
  {
    name: "Widal by Slide Method",
    id: 288,
    price: 80,
  },
  {
    name: "WIDAL by tube method",
    id: 289,
    price: 80,
  },
];

export default testData;
