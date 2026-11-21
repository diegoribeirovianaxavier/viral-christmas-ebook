const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, 'recipes_data.json');
const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

const chapterMetadata = [
  {
    num: 1,
    title: "Festive Dinner Starters & Appetizers",
    subtitle: "Sophisticated Hors d'Oeuvres, Molten Cheeses & Seafood Bites",
    desc: "Set an extraordinary holiday tone before the feast begins with elegant, flavor-packed starters: molten French brie in puff pastry, truffled beef carpaccio crostini, blistered grapes with fresh burrata, and crispy bacon-wrapped colossal sea scallops.",
    startPage: 5,
    recipeStartPage: 6
  },
  {
    num: 2,
    title: "Showstopping Christmas Roasts & Main Courses",
    subtitle: "Prime Rib, Beef Wellington, Glazed Ham & Crown Roasts",
    desc: "The glorious centerpieces of the Christmas dinner table: reverse-seared prime rib roast with red wine au jus, classic Beef Wellington with prosciutto and duxelles, bourbon-glazed spiral ham, and tender braised short ribs.",
    startPage: 14,
    recipeStartPage: 15
  },
  {
    num: 3,
    title: "Classic & Viral Holiday Side Dishes",
    subtitle: "Silky Purées, Golden Gratins & Caramelized Winter Vegetables",
    desc: "Irresistible accompaniments that rival the main roast: ultra-creamy Yukon Gold garlic mashed potatoes, classic Gruyère potatoes dauphinoise, shatteringly crisp smashed Brussels sprouts, and honey-roasted rainbow carrots over whipped chèvre.",
    startPage: 23,
    recipeStartPage: 24
  },
  {
    num: 4,
    title: "Holiday Stuffings, Dinner Rolls, Salads & Sauces",
    subtitle: "Sourdough Bakes, Feather-Light Rolls, Fresh Greens & Gravies",
    desc: "The indispensable essentials of the holiday feast: artisan sausage and sage sourdough stuffing, feather-light garlic butter Parker House rolls, sky-high Yorkshire puddings, spiced orange cranberry sauce, and rich pan gravy.",
    startPage: 32,
    recipeStartPage: 33
  },
  {
    num: 5,
    title: "Grand Finale Christmas Dinner Desserts",
    subtitle: "Woodland Yule Logs, Warm Puddings & Showstopping Tarts",
    desc: "Bring the Christmas celebration to a breathtaking conclusion with iconic holiday sweets: traditional chocolate Bûche de Noël, spiced eggnog tiramisu, sticky toffee date pudding, southern bourbon pecan pie, and molten chocolate lava cakes.",
    startPage: 41,
    recipeStartPage: 42
  }
];

function buildHTML() {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Christmas Dinner Feast — 40 Showstopping Holiday Recipes</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- PAGE 1: COVER -->
  <div class="page cover-page">
    <img src="assets/cover.png" alt="Christmas Dinner Feast Cover" class="cover-bg">
    <div class="cover-gradient-overlay"></div>
    <div class="cover-content">
      <div class="cover-header-top">
        <div class="cover-badge-top">Collector's Edition • Christmas Dinner Feast</div>
        <div class="cover-title-group">
          <h1>Christmas <span class="highlight-gold">Dinner</span><br>Feast</h1>
          <div class="cover-divider-flourish">
            <span class="line"></span>
            <span class="flourish">✦ ✦ ✦</span>
            <span class="line"></span>
          </div>
          <p class="cover-subtitle">40 Showstopping, Tested & Perfected Holiday Recipes for an Unforgettable Christmas Eve & Christmas Day Table</p>
        </div>
      </div>
      
      <div class="cover-footer">
        <div class="cover-pills">
          <span class="cover-pill">100% Christmas Dinner</span>
          <span class="cover-pill">Starters to Grand Desserts</span>
          <span class="cover-pill">US & Metric Measures</span>
          <span class="cover-pill">Individual Food Photos</span>
        </div>
        <div class="cover-author">Curated by Editorial Culinary Directors & Gastronomy Researchers</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: WELCOME LETTER & PRACTICAL KITCHEN CONVERSIONS -->
  <div class="page editorial-page">
    <div class="page-header">
      <span class="brand">Christmas Dinner Feast</span>
      <span>Introduction & Kitchen Guide</span>
    </div>

    <div class="intro-grid">
      <div class="editorial-letter">
        <h2>The Art of the Holiday Table</h2>
        <p><span class="dropcap">N</span>o meal of the year carries the emotional weight, pageantry, and warmth of Christmas Dinner. It is the culinary anchor of the season—a sacred moment where loved ones gather around candlelight, clinking glasses, and the comforting aroma of slow-roasted meats, bubbling gratins, and warm spiced desserts.</p>
        <p>This volume is dedicated entirely to the true holiday dinner. We deliberately eliminated breakfasts, brunches, and cocktails to focus 100% on the main event: 40 master-level dinner recipes curated from the world’s most revered culinary institutions and viral food communities (NYT Cooking, Serious Eats, RecipeTin Eats, and Bon Appétit).</p>
        <p>From reverse-seared bone-in Prime Rib and classic Beef Wellington to silky potato dauphinoise and towering Yorkshire puddings, every technique is engineered to ensure seamless, stress-free execution and restaurant-quality glory in your home kitchen.</p>
        <p style="margin-top: 14px; font-style: italic; color: var(--forest-green); font-weight: 600;">Wishing You a Warm, Joyous & Delicious Christmas!</p>
      </div>

      <div class="conversion-box">
        <h3>Holiday Kitchen Conversion Master</h3>
        <table class="conversion-table">
          <thead>
            <tr><th>US Standard</th><th>Metric</th><th>Ingredient Note</th></tr>
          </thead>
          <tbody>
            <tr><td>1 cup All-Purpose Flour</td><td>125 g</td><td>Spoon & leveled</td></tr>
            <tr><td>1 cup Bread Flour</td><td>130 g</td><td>Chewy brioche / crusts</td></tr>
            <tr><td>1 cup Granulated Sugar</td><td>200 g</td><td>White table sugar</td></tr>
            <tr><td>1 cup Brown Sugar</td><td>200 g</td><td>Firmly packed</td></tr>
            <tr><td>1 stick (1/2 cup) Butter</td><td>113 g</td><td>8 tbsp / 4 oz</td></tr>
            <tr><td>1 cup Liquid (Broth/Milk)</td><td>240 ml</td><td>Fluid volume</td></tr>
            <tr><td>1 tbsp / 1 tsp</td><td>15 ml / 5 ml</td><td>Standard spoons</td></tr>
            <tr><td>225°F (Reverse Sear)</td><td>107°C</td><td>Low & slow roasting</td></tr>
            <tr><td>350°F / 375°F / 400°F</td><td>175°C / 190°C / 205°C</td><td>Standard baking</td></tr>
            <tr><td>425°F / 500°F (High Sear)</td><td>220°C / 260°C</td><td>Yorkshire puff / crust</td></tr>
          </tbody>
        </table>

        <h3 style="margin-top: 12px;">The 3 Host Commandments</h3>
        <ul style="font-size: 10px; line-height: 1.45; color: var(--text-dark); padding-left: 14px;">
          <li><strong>Dry Brining is Non-Negotiable:</strong> Salting roasts 24 hours ahead tenderizes muscle fibers and yields a shatteringly crisp crust.</li>
          <li><strong>Use an Instant-Read Thermometer:</strong> Never cook prime rib or poultry by time alone; pull meat at exact internal temperatures.</li>
          <li><strong>Rest Before Carving:</strong> Resting roasts for 20-30 minutes allows juices to redistribute so every slice is tender and succulent.</li>
        </ul>
      </div>
    </div>

    <div class="page-footer">
      <span>Editorial Foundations & Kitchen Standards</span>
      <span class="page-number">2</span>
    </div>
  </div>

  <!-- PAGE 3: TABLE OF CONTENTS (Part 1: Chapters 1 & 2) -->
  <div class="page editorial-page">
    <div class="page-header">
      <span class="brand">Christmas Dinner Feast</span>
      <span>Table of Contents • Chapters 1 & 2</span>
    </div>

    <h2 class="toc-title">Table of Contents</h2>
    <div class="toc-subtitle">A Curated Collection of 40 Christmas Dinner Masterpieces</div>

    <div class="toc-grid">
      <!-- Chapter 1 -->
      <div class="toc-chapter">
        <div class="toc-chapter-header">
          <span class="toc-chapter-title">Chapter 1: Dinner Starters & Appetizers</span>
          <span class="toc-chapter-page">p. 5</span>
        </div>
        ${recipes.slice(0, 8).map((r, i) => `
          <div class="toc-recipe-item">
            <span class="num">${r.id}.</span>
            <span class="title">${r.title}</span>
            <span class="dots"></span>
            <span class="page-ref">${6 + i}</span>
          </div>
        `).join('')}
      </div>

      <!-- Chapter 2 -->
      <div class="toc-chapter">
        <div class="toc-chapter-header">
          <span class="toc-chapter-title">Chapter 2: Holiday Roasts & Main Courses</span>
          <span class="toc-chapter-page">p. 14</span>
        </div>
        ${recipes.slice(8, 16).map((r, i) => `
          <div class="toc-recipe-item">
            <span class="num">${r.id}.</span>
            <span class="title">${r.title}</span>
            <span class="dots"></span>
            <span class="page-ref">${15 + i}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="page-footer">
      <span>Christmas Dinner Feast</span>
      <span class="page-number">3</span>
    </div>
  </div>

  <!-- PAGE 4: TABLE OF CONTENTS (Part 2: Chapters 3, 4 & 5) -->
  <div class="page editorial-page">
    <div class="page-header">
      <span class="brand">Christmas Dinner Feast</span>
      <span>Table of Contents • Chapters 3, 4 & 5</span>
    </div>

    <div class="toc-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
      <!-- Chapter 3 -->
      <div class="toc-chapter">
        <div class="toc-chapter-header">
          <span class="toc-chapter-title">Chapter 3: Holiday Side Dishes</span>
          <span class="toc-chapter-page">p. 23</span>
        </div>
        ${recipes.slice(16, 24).map((r, i) => `
          <div class="toc-recipe-item">
            <span class="num">${r.id}.</span>
            <span class="title">${r.title}</span>
            <span class="dots"></span>
            <span class="page-ref">${24 + i}</span>
          </div>
        `).join('')}
      </div>

      <!-- Chapter 4 -->
      <div class="toc-chapter">
        <div class="toc-chapter-header">
          <span class="toc-chapter-title">Chapter 4: Stuffings, Rolls, Salads & Sauces</span>
          <span class="toc-chapter-page">p. 32</span>
        </div>
        ${recipes.slice(24, 32).map((r, i) => `
          <div class="toc-recipe-item">
            <span class="num">${r.id}.</span>
            <span class="title">${r.title}</span>
            <span class="dots"></span>
            <span class="page-ref">${33 + i}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Chapter 5 Full Width -->
    <div class="toc-chapter" style="margin-top: 14px;">
      <div class="toc-chapter-header">
        <span class="toc-chapter-title">Chapter 5: Grand Finale Christmas Desserts</span>
        <span class="toc-chapter-page">p. 41</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <div>
          ${recipes.slice(32, 36).map((r, i) => `
            <div class="toc-recipe-item">
              <span class="num">${r.id}.</span>
              <span class="title">${r.title}</span>
              <span class="dots"></span>
              <span class="page-ref">${42 + i}</span>
            </div>
          `).join('')}
        </div>
        <div>
          ${recipes.slice(36, 40).map((r, i) => `
            <div class="toc-recipe-item">
              <span class="num">${r.id}.</span>
              <span class="title">${r.title}</span>
              <span class="dots"></span>
              <span class="page-ref">${46 + i}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Christmas Dinner Feast</span>
      <span class="page-number">4</span>
    </div>
  </div>
`;

  // NOW LOOP THROUGH CHAPTERS AND RECIPES
  chapterMetadata.forEach((ch) => {
    // CHAPTER DIVIDER PAGE
    html += `
  <!-- CHAPTER ${ch.num} DIVIDER PAGE (Page ${ch.startPage}) -->
  <div class="page chapter-divider-page">
    <div class="chapter-divider-overlay" style="background: linear-gradient(180deg, #112016 0%, #1B3022 100%);"></div>
    <div class="chapter-divider-content" style="margin-bottom: 0.8in;">
      <span class="chapter-number-pill">Chapter 0${ch.num}</span>
      <h2 class="chapter-divider-title">${ch.title}</h2>
      <p class="chapter-divider-desc">${ch.desc}</p>
      <div class="chapter-recipe-tags">
        ${recipes.filter(r => r.chapter === ch.num).map(r => `<span class="chapter-tag">${r.title}</span>`).join('')}
      </div>
    </div>
    <div class="page-footer" style="color: rgba(255, 255, 255, 0.6); border-top-color: rgba(197, 160, 89, 0.35);">
      <span style="color: rgba(255,255,255,0.7);">Christmas Dinner Feast</span>
      <span class="page-number" style="color: var(--gold-light);">${ch.startPage}</span>
    </div>
  </div>
    `;

    // 8 RECIPE PAGES
    const chapterRecipes = recipes.filter(r => r.chapter === ch.num);
    chapterRecipes.forEach((recipe, idx) => {
      const pageNum = ch.recipeStartPage + idx;
      const photoPath = `assets/recipe_${recipe.id}.png`;

      html += `
  <!-- RECIPE ${recipe.id}: ${recipe.title} (Page ${pageNum}) -->
  <div class="page recipe-page">
    <div class="page-header">
      <span class="brand">Chapter 0${recipe.chapter} • ${recipe.chapter_title}</span>
      <span>Recipe #${recipe.id}</span>
    </div>

    <div class="recipe-header-group">
      <h2 class="recipe-main-title">${recipe.title}</h2>
      <p class="recipe-hook-line">"${recipe.hook}"</p>
    </div>

    <div class="recipe-meta-bar">
      <div class="meta-item">
        <span class="meta-label">Prep Time</span>
        <span class="meta-value">${recipe.meta.prep_time}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Cook Time</span>
        <span class="meta-value">${recipe.meta.cook_time}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Total Time</span>
        <span class="meta-value">${recipe.meta.total_time}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Yield</span>
        <span class="meta-value">${recipe.meta.servings}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Skill Level</span>
        <span class="meta-value">${recipe.meta.difficulty}</span>
      </div>
    </div>

    <div class="recipe-content-grid">
      <!-- LEFT COLUMN: PHOTO & INGREDIENTS -->
      <div class="recipe-left-col">
        <div class="recipe-photo-container">
          <img src="${photoPath}" alt="${recipe.title}">
        </div>

        <div class="recipe-ingredients-block">
          <div class="section-label">
            <span>Ingredients</span>
          </div>
          <ul class="ingredient-list">
            ${recipe.ingredients.map(ing => {
              if (ing.endsWith(':') || ing.startsWith('For ')) {
                return `<li class="ingredient-subheading">${ing}</li>`;
              }
              return `<li class="ingredient-item">${ing}</li>`;
            }).join('')}
          </ul>
        </div>
      </div>

      <!-- RIGHT COLUMN: INSTRUCTIONS & CHEF'S TIP -->
      <div class="recipe-right-col">
        <div class="instructions-block">
          <div class="section-label">
            <span>Step-by-Step Method</span>
          </div>
          <div class="instructions-list">
            ${recipe.instructions.map(step => {
              // Highlight step prefix like "1. Hard Sear:"
              const match = step.match(/^(\d+\.\s+[^:]+:)(.*)$/);
              if (match) {
                return `<div class="instruction-step"><strong>${match[1]}</strong>${match[2]}</div>`;
              }
              return `<div class="instruction-step">${step}</div>`;
            }).join('')}
          </div>
        </div>

        <div class="chefs-tip-box">
          <div class="chefs-tip-header">
            <span class="icon">✦</span>
            <span>Chef's Golden Rule</span>
          </div>
          <div class="chefs-tip-content">${recipe.chefs_tip}</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Christmas Dinner Feast</span>
      <span class="page-number">${pageNum}</span>
    </div>
  </div>
      `;
    });
  });

  // PAGE 50: BACK COVER
  html += `
  <!-- PAGE 50: BACK COVER -->
  <div class="page back-cover-page">
    <div class="back-cover-badge">Collector's Edition</div>
    <h2 class="back-cover-title">An Unforgettable Feast,<br>A Lifetime of Memories</h2>
    <p class="back-cover-text">
      Christmas dinner is more than a meal—it is a celebration of warmth, fellowship, and tradition. From the crackle of a golden prime rib crust to the comforting sweetness of sticky toffee pudding, these 40 recipes were tested and perfected to bring restaurant-caliber grandeur to your home table.
    </p>

    <div class="back-cover-features">
      <span class="feature-pill">✦ 100% Christmas Dinner</span>
      <span class="feature-pill">✦ Dual US & Metric Units</span>
      <span class="feature-pill">✦ Exclusive Photography</span>
      <span class="feature-pill">✦ Chef's Master Tips</span>
    </div>

    <div class="cover-divider-flourish" style="margin-bottom: 24px;">
      <span class="line" style="width: 80px;"></span>
      <span class="flourish">✦ ✦ ✦</span>
      <span class="line" style="width: 80px;"></span>
    </div>

    <div class="back-cover-signoff">
      "May your holiday table be abundant, and your season filled with joy."
    </div>
  </div>

</body>
</html>
`;

  fs.writeFileSync(path.join(__dirname, 'ebook.html'), html, 'utf8');
  console.log('SUCCESS: ebook.html generated successfully with all 50 pages!');
}

buildHTML();
