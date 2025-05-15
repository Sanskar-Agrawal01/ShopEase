// Common keywords and their related terms
const keywordMap: Record<string, string[]> = {
  'sit': ['sofa', 'chair', 'couch', 'bench', 'stool', 'seat'],
  'sleep': ['bed', 'mattress', 'pillow', 'blanket', 'duvet'],
  'eat': ['table', 'dining', 'chair', 'plate', 'bowl', 'cutlery'],
  'store': ['cabinet', 'shelf', 'wardrobe', 'closet', 'drawer', 'storage'],
  'decorate': ['painting', 'vase', 'lamp', 'curtain', 'rug', 'art'],
  'work': ['desk', 'office', 'chair', 'computer', 'monitor'],
  'cook': ['kitchen', 'stove', 'oven', 'utensil', 'pan', 'pot'],
  'family': ['sofa', 'table', 'bed', 'chair', 'storage'],
  'comfort': ['sofa', 'bed', 'chair', 'pillow', 'mattress'],
  'small': ['compact', 'mini', 'tiny', 'portable'],
  'large': ['big', 'huge', 'spacious', 'wide'],
  'modern': ['contemporary', 'sleek', 'minimal', 'design'],
  'traditional': ['classic', 'vintage', 'antique', 'retro'],
};

// Function to get related keywords for a given word
const getRelatedKeywords = (word: string): string[] => {
  const normalizedWord = word.toLowerCase();
  return keywordMap[normalizedWord] || [normalizedWord];
};

// Function to break down a search query into keywords
const getSearchKeywords = (query: string): string[] => {
  // Remove common words and split into keywords
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by'];
  const words = query.toLowerCase().split(/\s+/).filter(word => !commonWords.includes(word));
  
  // Get related keywords for each word
  return words.flatMap(word => getRelatedKeywords(word));
};

// Main search function
export const contextualSearch = (products: any[], query: string): any[] => {
  if (!query.trim()) return products;
  
  const searchKeywords = getSearchKeywords(query);
  
  return products.filter(product => {
    const productText = `${product.name} ${product.description}`.toLowerCase();
    
    // Check if any of the search keywords match the product text
    return searchKeywords.some(keyword => productText.includes(keyword));
  });
}; 