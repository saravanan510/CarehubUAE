const testData = [
  {
    name: "Vitamin D, 25-hydroxy (25-OH Cholecalciferol) Total - 82306",
    id: 1,
    price: 140,
  },
  {
    name: "17-Hydroxy Progesterone level",
    id: 2,
    price: 200,
  },
  {
    name: "Absolute Eosinophil Count",
    id: 3,
    price: 24,
  },
  {
    name: "Absolute Neutrophil Count",
    id: 4,
    price: 24,
  },
  {
    name: "Allergen Screening- Food (44 panel), Serum",
    id: 5,
    price: 280,
  },
  {
    name: "Allergen Screening- inhalant (44 panel), Serum",
    id: 6,
    price: 280,
  },
  {
    name: "Alpha Feto Protein level",
    id: 7,
    price: 100,
  },
  {
    name: "Amylase Pancreatic, Serum",
    id: 8,
    price: 180,
  },
  {
    name: "Amylase-Serum",
    id: 9,
    price: 60,
  },
  {
    name: "ANA 25",
    id: 10,
    price: 285,
  },
  {
    name: "Anti Thyroid Antibody",
    id: 11,
    price: 195,
  },
  {
    name: "Autoimmune Hepatitis Profile (EIA)",
    id: 12,
    price: 500,
  },
  {
    name: "B - 2 Microglobulin level - serum",
    id: 13,
    price: 200,
  },
  {
    name: "B - Type Natriuretic Peptide(BNP)",
    id: 14,
    price: 250,
  },
  {
    name: "Bilirubin Direct, Serum - 82248",
    id: 15,
    price: 20,
  },
  {
    name: "Bilirubin Indirect, Serum - 82247",
    id: 16,
    price: 20,
  },
  {
    name: "Bilirubin level Total",
    id: 17,
    price: 20,
  },
  {
    name: "Blood Group & RH ( Forward and Reverse )",
    id: 18,
    price: 88,
  },
  {
    name: "Blood Urea Nitrogen (BUN)",
    id: 19,
    price: 20,
  },
  {
    name: "C- Reactive Protein",
    id: 20,
    price: 48,
  },
  {
    name: "C.A.-125 level",
    id: 21,
    price: 180,
  },
  {
    name: "C.M.V antibody IgG",
    id: 22,
    price: 120,
  },
  {
    name: "C.M.V. antibody IgM",
    id: 23,
    price: 120,
  },
  {
    name: "CA-19-9 level",
    id: 24,
    price: 160,
  },
  {
    name: "Calcium",
    id: 25,
    price: 24,
  },
  {
    name: "Carcino Embryonic Antigen level",
    id: 26,
    price: 120,
  },
  {
    name: "Cardiolipin antibody IgA",
    id: 27,
    price: 200,
  },
  {
    name: "Cardiolipin antibody IgG & IgM",
    id: 28,
    price: 240,
  },
  {
    name: "Cholesterol",
    id: 29,
    price: 20,
  },
  {
    name: "Coombs Test Direct (By Gel Technology)",
    id: 30,
    price: 100,
  },
  {
    name: "Coombs Test Indirect (By Gel Technology)",
    id: 31,
    price: 100,
  },
  {
    name: "Cortisol 8 AM",
    id: 32,
    price: 80,
  },
  {
    name: "C-Peptide level",
    id: 33,
    price: 140,
  },
  {
    name: "CPK Total",
    id: 34,
    price: 60,
  },
  {
    name: "CPK-MB level",
    id: 35,
    price: 24,
  },
  {
    name: "Creatinine",
    id: 36,
    price: 24,
  },
  {
    name: "Dengue antibody IgG & IgM-Elisa",
    id: 37,
    price: 270,
  },
  {
    name: "Dengue Antigen (NS1)- Rapid - 87449",
    id: 38,
    price: 140,
  },
  {
    name: "Dengue Antigen NS1 Elisa",
    id: 39,
    price: 160,
  },
  {
    name: "Double Marker",
    id: 40,
    price: 240,
  },
  {
    name: "Electrolytes",
    id: 41,
    price: 108,
  },
  {
    name: "Fasting Insulin & Glucose",
    id: 42,
    price: 180,
  },
  {
    name: "Ferritin",
    id: 43,
    price: 100,
  },
  {
    name: "Flu a, Flu B and H1N1 Qualitative by Real-time PCR",
    id: 44,
    price: 600,
  },
  {
    name: "Folic Acid level",
    id: 45,
    price: 120,
  },
  {
    name: "Follicle Stimulating Hormone level",
    id: 46,
    price: 72,
  },
  {
    name: "Free Beta HCG level",
    id: 47,
    price: 140,
  },
  {
    name: "Free Prostate Specific Antigen",
    id: 48,
    price: 120,
  },
  {
    name: "Free Testosterone",
    id: 49,
    price: 180,
  },
  {
    name: "Free Thyroxine(Free T4)",
    id: 50,
    price: 72,
  },
  {
    name: "Free Triiodothyronine(Free T3)",
    id: 51,
    price: 72,
  },
  {
    name: "Glucose – Fasting",
    id: 52,
    price: 20,
  },
  {
    name: "Glucose - Post Prandial",
    id: 53,
    price: 20,
  },
  {
    name: "Glucose – Random",
    id: 54,
    price: 20,
  },
  {
    name: "Glyco Hemoglobin (HBA1C)",
    id: 55,
    price: 24,
  },
  {
    name: "Haemoglobin",
    id: 56,
    price: 240,
  },
  {
    name: "Haemogram (CBC)",
    id: 57,
    price: 28,
  },
  {
    name: "Haemogram with ESR (CBC-ESR)",
    id: 58,
    price: 60,
  },
  {
    name: "HB Electrophoresis ( Capillary )",
    id: 59,
    price: 200,
  },
  {
    name: "HAV antibody IgM",
    id: 60,
    price: 140,
  },
  {
    name: "HBs antigen",
    id: 61,
    price: 120,
  },
  {
    name: "HBV (Hepatitis B) Qualitative by Real-time PCR",
    id: 62,
    price: 400,
  },
  {
    name: "HCV (Hepatitis C) Qualitative by Real-time PCR",
    id: 63,
    price: 500,
  },
  {
    name: "HCV antibody IgM",
    id: 64,
    price: 240,
  },
  {
    name: "High Sensitive CRP",
    id: 65,
    price: 120,
  },
  // {
  //   name: "HIV I & II",
  //   id: 66,
  //   price: 120,
  // },
  {
    name: "Homocysteine level",
    id: 67,
    price: 200,
  },
  {
    name: "HSV I Profile",
    id: 68,
    price: 140,
  },
  {
    name: "HSV II Profile",
    id: 69,
    price: 140,
  },
  {
    name: "IgA level",
    id: 70,
    price: 120,
  },
  {
    name: "IgE level",
    id: 71,
    price: 120,
  },
  {
    name: "Iron Profile",
    id: 72,
    price: 100,
  },
  {
    name: "Iron Studies (TIBC)",
    id: 73,
    price: 60,
  },
  {
    name: "Leutinizing Hormone level",
    id: 74,
    price: 72,
  },
  {
    name: "Lipase",
    id: 75,
    price: 60,
  },
  {
    name: "Lipid Profile",
    id: 76,
    price: 100,
  },
  {
    name: "Liver Function Test",
    id: 77,
    price: 100,
  },
  {
    name: "Magnesium Level",
    id: 78,
    price: 48,
  },
  {
    name: "Microalbumin Level from urine",
    id: 79,
    price: 80,
  },
  {
    name: "Occult Blood",
    id: 80,
    price: 48,
  },
  {
    name: "Osmolality Serum",
    id: 81,
    price: 180,
  },
  {
    name: "Osmolality Urine",
    id: 82,
    price: 180,
  },
  {
    name: "Para Thyroid Hormone Intact level",
    id: 83,
    price: 180,
  },
  {
    name: "Peripheral Smear",
    id: 84,
    price: 80,
  },
  {
    name: "Potassium",
    id: 85,
    price: 60,
  },
  {
    name: "Procalcitonin",
    id: 86,
    price: 220,
  },
  {
    name: "Progesterone level",
    id: 87,
    price: 120,
  },
  {
    name: "Prolactin level",
    id: 88,
    price: 72,
  },
  {
    name: "Prostate Specific Antigen level",
    id: 89,
    price: 120,
  },
  {
    name: "Prothrombin Time (Photooptical clot detection)",
    id: 90,
    price: 60,
  },
  {
    name: "Quadruple Marker",
    id: 91,
    price: 400,
  },
  {
    name: "Quantiferon TB Gold (IGRA)",
    id: 92,
    price: 280,
  },
  {
    name: "Renal Function Test",
    id: 93,
    price: 120,
  },
  {
    name: "Reticulocyte Count",
    id: 94,
    price: 60,
  },
  {
    name: "Rheumatoid Factor",
    id: 95,
    price: 72,
  },
  {
    name: "Rubella antibody IgG",
    id: 96,
    price: 120,
  },
  {
    name: "Rubella antibody IgM",
    id: 97,
    price: 120,
  },
  {
    name: "SGOT (AST)",
    id: 98,
    price: 20,
  },
  {
    name: "SGPT (ALT)",
    id: 99,
    price: 20,
  },
  {
    name: "Sodium",
    id: 100,
    price: 60,
  },
  {
    name: "Stool Examination",
    id: 101,
    price: 48,
  },
  {
    name: "Syphilis Antibody",
    id: 102,
    price: 80,
  },
  {
    name: "Testosterone level",
    id: 103,
    price: 100,
  },
  {
    name: "Thyroid Function Test",
    id: 104,
    price: 140,
  },
  {
    name: "Thyroid Function Test(Free)",
    id: 105,
    price: 160,
  },
  {
    name: "Thyroid Stimulating Immunoglobulin level",
    id: 106,
    price: 320,
  },
  {
    name: "Thyroperoxidase Antibody (Anti-TPO)",
    id: 107,
    price: 160,
  },
  {
    name: "Thyroxine Binding Globulin level",
    id: 108,
    price: 195,
  },
  {
    name: "Torch Complex (10 Parameters)",
    id: 109,
    price: 400,
  },
  {
    name: "TOTAL PROTEIN",
    id: 110,
    price: 24,
  },
  {
    name: "Transferrin Level",
    id: 111,
    price: 160,
  },
  {
    name: "Transferrin Saturation",
    id: 112,
    price: 60,
  },
  {
    name: "Triglyceride",
    id: 113,
    price: 20,
  },
  {
    name: "Troponin I",
    id: 114,
    price: 270,
  },
  {
    name: "Unsaturated Iron Binding Capacity",
    id: 115,
    price: 60,
  },
  {
    name: "Urea",
    id: 116,
    price: 20,
  },
  {
    name: "Uric Acid",
    id: 117,
    price: 20,
  },
  {
    name: "Urinary Protein-24 hours",
    id: 118,
    price: 100,
  },
  {
    name: "Urine Albumin",
    id: 119,
    price: 48,
  },
  {
    name: "Urine Examination",
    id: 120,
    price: 40,
  },
  {
    name: "Vitamin A",
    id: 121,
    price: 300,
  },
  {
    name: "Vitamin B - 12 Level",
    id: 122,
    price: 120,
  },
  {
    name: "Vitamin B1 (Thiamine)",
    id: 123,
    price: 300,
  },
  {
    name: "Vitamin B2 (Riboflavin)",
    id: 124,
    price: 300,
  },
  {
    name: "VITAMIN B3",
    id: 125,
    price: 600,
  },
  {
    name: "VITAMIN B5",
    id: 126,
    price: 600,
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
    price: 380,
  },
  {
    name: "Vitamin E (Tocopherol)",
    id: 130,
    price: 300,
  },
  {
    name: "VITAMIN H (BIOTIN) (B7)",
    id: 131,
    price: 640,
  },
  {
    name: "VITAMIN K1",
    id: 132,
    price: 400,
  },
  {
    name: "XPERT HCV (HEPATITIS C VIRUS) VIRAL LOAD",
    id: 133,
    price: 500,
  },
  {
    name: "Zinc Level",
    id: 134,
    price: 180,
  },
  {
    name: "ACTH Level [Adrenocorticotropic hormone]",
    id: 135,
    price: 200,
  },
  {
    name: "Activated Partial Thromboplastin Time (Photooptical clot detection)",
    id: 136,
    price: 100,
  },
  {
    name: "Adenosine Deaminase From Blood",
    id: 137,
    price: 100,
  },
  {
    name: "Adenovirus antigen from Respiratory sample",
    id: 138,
    price: 240,
  },
  {
    name: "Adenovirus Qualitative by Real Time PCR",
    id: 139,
    price: 300,
  },
  {
    name: "ADH - Anti Diuretic Hormone",
    id: 140,
    price: 480,
  },
  {
    name: "AFB (ZN) stain for Sputum",
    id: 141,
    price: 60,
  },
  {
    name: "AFB Culture (MGIT)",
    id: 142,
    price: 210,
  },
  {
    name: "AFB stain",
    id: 143,
    price: 60,
  },
  {
    name: "Albumin-Serum",
    id: 144,
    price: 24,
  },
  {
    name: "Aldolase",
    id: 145,
    price: 195,
  },
  {
    name: "Aldosterone level",
    id: 146,
    price: 220,
  },
  {
    name: "Aldosterone to Renin Ratio",
    id: 147,
    price: 250,
  },
  {
    name: "Alkaline Phosphatase level",
    id: 148,
    price: 24,
  },
  {
    name: "Allergy-Penicillium chrysogenum m1",
    id: 149,
    price: 160,
  },
  {
    name: "Alpha 1 Antitrypsin",
    id: 150,
    price: 225,
  },
  {
    name: "Alpha Thalassemia - 81257",
    id: 151,
    price: 2000,
  },
  {
    name: "ALPHA-2- MACROGLOBULIN",
    id: 152,
    price: 500,
  },
  {
    name: "Aluminum level",
    id: 153,
    price: 285,
  },
  {
    name: "Anti CCP Level",
    id: 154,
    price: 200,
  },
  {
    name: "Anti ds DNA ( IIF )",
    id: 155,
    price: 180,
  },
  {
    name: "Anti ds DNA (ds DNA antibody) Qualitative Serum",
    id: 156,
    price: 200,
  },
  {
    name: "Anti Mullerian Hormone",
    id: 157,
    price: 285,
  },
  {
    name: "Anti MuSK Antibodies",
    id: 158,
    price: 780,
  },
  {
    name: "Anti Neutrophilic Cytoplasmic Antibodies ( IIF )",
    id: 159,
    price: 240,
  },
  {
    name: "Anti Neutrophilic Cytoplasmic Antibody (ELISA)",
    id: 160,
    price: 180,
  },
  {
    name: "Anti Nuclear Antibody ( IIF )",
    id: 161,
    price: 180,
  },
  {
    name: "Anti Phospholipid Antibody",
    id: 162,
    price: 180,
  },
  {
    name: "Anti Thrombin III",
    id: 163,
    price: 300,
  },
  {
    name: "Antibody screening for HLA Class I & II",
    id: 164,
    price: 800,
  },
  {
    name: "Antistreptolysin - O",
    id: 165,
    price: 80,
  },
  {
    name: "Apolipoprotein A - 1",
    id: 166,
    price: 180,
  },
  {
    name: "Apolipoprotein A-1+B",
    id: 167,
    price: 240,
  },
  {
    name: "Apolipoprotein B",
    id: 168,
    price: 180,
  },
  {
    name: "Aspergillosis antibody IgG",
    id: 169,
    price: 180,
  },
  {
    name: "Aspergillosis antibody IgM",
    id: 170,
    price: 180,
  },
  {
    name: "Aspergillus Antigen (Galactomannan)",
    id: 171,
    price: 180,
  },
  {
    name: "Bence Jones Protein",
    id: 172,
    price: 100,
  },
  {
    name: "Benzodiazepam",
    id: 173,
    price: 180,
  },
  {
    name: "Beta 2 Glycoprotein 1 antibody (IgG+IgM)",
    id: 174,
    price: 210,
  },
  {
    name: "Beta HCG level",
    id: 175,
    price: 92,
  },
  {
    name: "Beta Thal TRIO",
    id: 176,
    price: 1600,
  },
  {
    name: "Beta Thalassemia (5 Common Mutation)",
    id: 177,
    price: 600,
  },
  {
    name: "Bicarbonate",
    id: 178,
    price: 60,
  },
  {
    name: "BRCA1&2 by NGS (Germ-line)",
    id: 179,
    price: 1800,
  },
  {
    name: "CA-15-3 level",
    id: 180,
    price: 140,
  },
  {
    name: "Cancer marker profile-Breast",
    id: 181,
    price: 240,
  },
  {
    name: "Cancer marker profile-Colorectal",
    id: 182,
    price: 800,
  },
  {
    name: "Cancer marker profile-Ovary",
    id: 183,
    price: 526,
  },
  {
    name: "Cancer marker profile-Thyroid",
    id: 184,
    price: 916,
  },
  {
    name: "Carcino Embryonic Antigen level",
    id: 185,
    price: 120,
  },
  {
    name: "Catecholamine level-Plasma",
    id: 186,
    price: 500,
  },
  {
    name: "Catecholamine -Random Urine",
    id: 187,
    price: 500,
  },
  {
    name: "Ceruloplasmin level",
    id: 188,
    price: 180,
  },
  {
    name: "Chikungunya antibody IgM",
    id: 189,
    price: 180,
  },
  {
    name: "Chikungunya Qualitative by Real-time PCR",
    id: 190,
    price: 300,
  },
  {
    name: "Chloride",
    id: 191,
    price: 60,
  },
  {
    name: "Chlamydia Trachomatis Profile",
    id: 192,
    price: 234,
  },
  {
    name: "Copper Level",
    id: 193,
    price: 225,
  },
  {
    name: "Cortisol 2 Sample",
    id: 194,
    price: 160,
  },
  {
    name: " Creatinine Clearance Test",
    id: 195,
    price: 60,
  },
  {
    name: "DDimer",
    id: 196,
    price: 180,
  },
  {
    name: "Dehydroepiandrosterone (DHEA), Serum^",
    id: 197,
    price: 255,
  },
  {
    name: "Dihydrotestosterone level",
    id: 198,
    price: 180,
  },
  {
    name: "DMD Duchenne Muscular Dystrophy By MLPA",
    id: 199,
    price: 1200,
  },
  {
    name: "Dopamine",
    id: 200,
    price: 280,
  },
  {
    name: "EBV (Epstein Barr Virus) Qualitative by Real-time PCR",
    id: 201,
    price: 500,
  },
  {
    name: "EBV antibody panel",
    id: 202,
    price: 346,
  },
  {
    name: "Encephalitis Panel ( Cell based study )",
    id: 203,
    price: 2000,
  },
  {
    name: "Erythropoetin level",
    id: 204,
    price: 225,
  },
  {
    name: "ESR",
    id: 205,
    price: 28,
  },
  {
    name: "Estradiol level",
    id: 206,
    price: 100,
  },
  {
    name: "Estriol level",
    id: 207,
    price: 200,
  },
  {
    name: "Factor II (Prothrombin) G20210A by Real-time PCR",
    id: 208,
    price: 450,
  },
  {
    name: "FACTOR V (Leiden) G1691A by Real-time PCR",
    id: 209,
    price: 600,
  },
  {
    name: "Fecal Calprotectin Level",
    id: 210,
    price: 280,
  },
  {
    name: "Fecal Elastase-1",
    id: 211,
    price: 550,
  },
  {
    name: "Fibrinogen Level ( Clauss Method )",
    id: 212,
    price: 200,
  },
  {
    name: " G6PD",
    id: 213,
    price: 180,
  },
  {
    name: "Gamma Glutamyl Transferase (GGT)",
    id: 214,
    price: 24,
  },
  {
    name: "Gastrointestinal Panel",
    id: 215,
    price: 1600,
  },
  {
    name: "GeneXpert-MTB/XDR",
    id: 216,
    price: 800,
  },
  {
    name: "GeneXpert-TB CB-NAAT",
    id: 217,
    price: 300,
  },
  {
    name: "GTT 3 Sample",
    id: 218,
    price: 140,
  },
  {
    name: "H. Pylori antibody IgG & IgA",
    id: 219,
    price: 180,
  },
  {
    name: "H. Pylori Antigen From Stool",
    id: 220,
    price: 120,
  },
  {
    name: "H.Pylori antibody IgM",
    id: 221,
    price: 160,
  },
  {
    name: "HDL Cholesterol",
    id: 222,
    price: 28,
  },
  {
    name: "Heparin/PF4 Antibody Test",
    id: 223,
    price: 600,
  },
  {
    name: "Hepatitis E Virus antibody IgM",
    id: 224,
    price: 165,
  },
  {
    name: "HEV (Hepatitis E) Qualitative by Real-time PCR",
    id: 225,
    price: 500,
  },
  {
    name: "HLA B 27 By Real-time PCR",
    id: 226,
    price: 300,
  },
  {
    name: "H-Pylori Urea Breath Test",
    id: 227,
    price: 250,
  },
  {
    name: "Immunoglobulin Profile (IgG, IgM, IgA)",
    id: 228,
    price: 220,
  },
  {
    name: "INFLUENZA VIRUS A IgG",
    id: 229,
    price: 300,
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
    price: 800,
  },
  {
    name: "Ionic Calcium",
    id: 234,
    price: 100,
  },
  {
    name: "Jo - 1 antibody",
    id: 235,
    price: 240,
  },
  {
    name: "LDH",
    id: 236,
    price: 48,
  },
  {
    name: "LDL Cholesterol (Direct)",
    id: 237,
    price: 32,
  },
  {
    name: "Lipoprotein (a)",
    id: 238,
    price: 160,
  },
  {
    name: "Lipoprotein associated Phospholipase A2",
    id: 239,
    price: 600,
  },
  {
    name: "LUPUS ANTICOAGULANT (AS PER ISTH-2009)",
    id: 240,
    price: 220,
  },
  {
    name: "Malarial parasite ( smear )",
    id: 241,
    price: 60,
  },
  {
    name: "Measles Antibody IgG",
    id: 242,
    price: 140,
  },
  {
    name: "Measles Antibody IgM",
    id: 243,
    price: 140,
  },
  {
    name: "Mumps Antibody IgG & IgM",
    id: 244,
    price: 210,
  },
  {
    name: "Mumps antibody IgM",
    id: 245,
    price: 160,
  },
  {
    name: "Myoglobin level",
    id: 246,
    price: 180,
  },
  {
    name: "Neisseria Gonorrhoeae Qualitative by Real-time PCR",
    id: 247,
    price: 300,
  },
  {
    name: "New Born Screening 5",
    id: 248,
    price: 270,
  },
  {
    name: "New Born Screening 5 + Hemoglobinopathy",
    id: 249,
    price: 300,
  },
  {
    name: "New Born Screening 7",
    id: 250,
    price: 285,
  },
  {
    name: "New Born Screening-TSH",
    id: 251,
    price: 160,
  },
  {
    name: "Phosphorus Inorganic",
    id: 252,
    price: 28,
  },
  {
    name: "Platelet Count",
    id: 253,
    price: 24,
  },
  {
    name: "Protein With A/G Ratio",
    id: 254,
    price: 40,
  },
  {
    name: "Rapid Malarial Antigen ( Card ) - 87430",
    id: 255,
    price: 140,
  },
  {
    name: "Rapid Plasma Reagin (VDRL)",
    id: 256,
    price: 48,
  },
  {
    name: "Renin Level",
    id: 257,
    price: 260,
  },
  {
    name: "Reverse Triiodothyronine (Rev T3)",
    id: 258,
    price: 640,
  },
  {
    name: "Respiratory Pathogens Qualitative by Real-time PCR",
    id: 259,
    price: 1300,
  },
  {
    name: "Salmonella Qualitative by Real-time PCR",
    id: 260,
    price: 360,
  },
  {
    name: "Scrub Typhus antibody IgM",
    id: 261,
    price: 255,
  },
  {
    name: "Serotonin-Serum",
    id: 262,
    price: 240,
  },
  {
    name: "Sex Hormone Binding Globulin level",
    id: 263,
    price: 120,
  },
  {
    name: "Sperm antibody",
    id: 264,
    price: 180,
  },
  {
    name: "SS-A/Ro antibody",
    id: 265,
    price: 165,
  },
  {
    name: "SS-B/La antibody",
    id: 266,
    price: 255,
  },
  {
    name: "STD 7",
    id: 267,
    price: 400,
  },
  {
    name: "STD 28",
    id: 268,
    price: 1800,
  },
  {
    name: "Thrombin Time",
    id: 269,
    price: 240,
  },
  {
    name: "Tissue Transglutaminase IgA (TTG-A)",
    id: 270,
    price: 180,
  },
  {
    name: "Tissue Transglutaminase IgG (TTG-G)",
    id: 271,
    price: 180,
  },
  {
    name: "Toxo antibody IgG",
    id: 272,
    price: 120,
  },
  {
    name: "Toxo antibody IgM",
    id: 273,
    price: 120,
  },
  {
    name: "Toxoplasma gondii Qualitative by Real-time PCR",
    id: 274,
    price: 400,
  },
  {
    name: "TPHA",
    id: 275,
    price: 80,
  },
  {
    name: "Triple Marker",
    id: 276,
    price: 320,
  },
  {
    name: "Tropical Fever Panel Qualitative by Real-Time PCR",
    id: 277,
    price: 700,
  },
  {
    name: "Urinary Albumin Creatinine ratio",
    id: 278,
    price: 60,
  },
  {
    name: "Urinary Cortisol- 24 hours",
    id: 279,
    price: 165,
  },
  {
    name: "Urinary Metanephrine -24 hours",
    id: 280,
    price: 360,
  },
  {
    name: "Urinary Protein Creatinine Ratio",
    id: 281,
    price: 100,
  },
  {
    name: "Urine metabolic screen for stone",
    id: 282,
    price: 500,
  },
  {
    name: "Urine Myoglobin",
    id: 283,
    price: 200,
  },
  {
    name: "Urine oxalate, 24 hrs",
    id: 284,
    price: 240,
  },
  {
    name: "Vanillylmandelic acid (VMA)",
    id: 285,
    price: 300,
  },
  {
    name: "Varicella Zoster antibody IgG",
    id: 286,
    price: 180,
  },
  {
    name: "Varicella Zoster antibody IgM",
    id: 287,
    price: 180,
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
