import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

interface Word {
  text: string;
  value: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  theme: 'emerging' | 'decreasing' | 'new';
}

interface Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const WordCloud = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const [showInsight, setShowInsight] = useState(false);

  // Sample data - replace with your own
  const wordData = useMemo(() => [
    { text: 'Delivery', value: 95 },
    { text: 'Food', value: 90 },
    { text: 'Restaurant', value: 85 },
    { text: 'Order', value: 80 },
    { text: 'Fast', value: 75 },
    { text: 'Pizza', value: 70 },
    { text: 'Burger', value: 65 },
    { text: 'Sushi', value: 60 },
    { text: 'Livraison', value: 55 }, // French
    { text: 'Nourriture', value: 50 }, // French
    { text: 'Restaurant', value: 48 }, // French
    { text: 'Commande', value: 45 }, // French
    { text: 'Rapide', value: 42 }, // French
    { text: 'توصيل', value: 40 }, // Arabic
    { text: 'طعام', value: 38 }, // Arabic
    { text: 'مطعم', value: 35 }, // Arabic
    { text: 'طلب', value: 33 }, // Arabic
    { text: 'سريع', value: 30 }, // Arabic
    { text: 'بيتزا', value: 28 }, // Arabic
    { text: 'برجر', value: 25 }, // Arabic
    { text: 'سوشي', value: 22 }, // Arabic
    { text: 'Fresh', value: 20 },
    { text: 'Hot', value: 18 },
    { text: 'Quality', value: 15 },
    { text: 'Service', value: 12 },
    { text: 'App', value: 10 }
  ], []);

  const themeColors = useMemo(() => ({
    emerging: ['#d1fae5', '#10b981', '#047857'], // light green, green, dark green
    decreasing: ['#fecaca', '#ef4444', '#dc2626'], // light red, red, dark red
    new: ['#dbeafe', '#3b82f6', '#1d4ed8'] // light blue, blue, dark blue
  }), []);

  useEffect(() => {
    const minValue = Math.min(...wordData.map(w => w.value));
    const maxValue = Math.max(...wordData.map(w => w.value));
    
    // Container dimensions for word positioning - use full available space
    const containerWidth = 600;  // Increased width
    const containerHeight = 400;
    const padding = 20;
    const availableWidth = containerWidth - 2 * padding;
    const availableHeight = containerHeight - 2 * padding;
    
    // Function to check if two rectangles overlap
    const rectanglesOverlap = (rect1: Rectangle, rect2: Rectangle) => {
      return !(rect1.right < rect2.left || 
               rect1.left > rect2.right || 
               rect1.bottom < rect2.top || 
               rect1.top > rect2.bottom);
    };
    
    // Function to get word bounding box
    const getWordBounds = (word: Word, fontSize: number): Rectangle => {
      const textWidth = word.text.length * fontSize * 0.6; // Rough estimate
      const textHeight = fontSize * 1.2;
      return {
        left: word.x - textWidth / 2,
        right: word.x + textWidth / 2,
        top: word.y - textHeight / 2,
        bottom: word.y + textHeight / 2
      };
    };
    
    // Generate positions with random distribution across the entire space
    const positioned: Word[] = [];
    
    wordData.forEach((word) => {
      const fontSize = 12 + ((word.value - minValue) / (maxValue - minValue)) * 36;
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;
      
      // Assign theme and color based on value percentile
      const percentile = (word.value - minValue) / (maxValue - minValue);
      let theme: 'emerging' | 'decreasing' | 'new';
      let colorIndex: number;
      
      if (percentile < 0.33) {
        theme = 'new';
        colorIndex = Math.floor((percentile / 0.33) * (themeColors.new.length - 1));
      } else if (percentile < 0.66) {
        theme = 'emerging';
        colorIndex = Math.floor(((percentile - 0.33) / 0.33) * (themeColors.emerging.length - 1));
      } else {
        theme = 'decreasing';
        colorIndex = Math.floor(((percentile - 0.66) / 0.34) * (themeColors.decreasing.length - 1));
      }
      
      const color = themeColors[theme][colorIndex];
      
      while (!placed && attempts < maxAttempts) {
        // Random positioning across the entire rectangular space
        const x = (Math.random() - 0.5) * availableWidth;
        const y = (Math.random() - 0.5) * availableHeight;
        
        const testWord: Word = {
          ...word,
          x,
          y,
          color,
          rotation: Math.random() * 40 - 20,
          theme
        };
        
        const bounds = getWordBounds(testWord, fontSize);
        
        // Check for overlaps with existing words
        let hasOverlap = false;
        for (const existingWord of positioned) {
          const existingFontSize = 12 + ((existingWord.value - minValue) / (maxValue - minValue)) * 36;
          const existingBounds = getWordBounds(existingWord, existingFontSize);
          if (rectanglesOverlap(bounds, existingBounds)) {
            hasOverlap = true;
            break;
          }
        }
        
        if (!hasOverlap) {
          positioned.push(testWord);
          placed = true;
        }
        
        attempts++;
      }
      
      // If we couldn't find a spot, try with reduced collision detection (fallback)
      if (!placed) {
        // let x, y;
        let foundSpot = false;
        let fallbackAttempts = 0;
        const maxFallbackAttempts = 50;
        
        while (!foundSpot && fallbackAttempts < maxFallbackAttempts) {
          const x = (Math.random() - 0.5) * availableWidth;
          const y = (Math.random() - 0.5) * availableHeight;
          
          // Check for minimal overlaps only
          const testWord: Word = {
            ...word,
            x,
            y,
            color,
            rotation: Math.random() * 40 - 20,
            theme
          };
          
          const bounds = getWordBounds(testWord, fontSize);
          let hasMajorOverlap = false;
          
          for (const existingWord of positioned) {
            const existingFontSize = 12 + ((existingWord.value - minValue) / (maxValue - minValue)) * 36;
            const existingBounds = getWordBounds(existingWord, existingFontSize);
            if (rectanglesOverlap(bounds, existingBounds)) {
              // Allow some overlap for smaller words
              const overlapArea = Math.max(0, Math.min(bounds.right, existingBounds.right) - Math.max(bounds.left, existingBounds.left)) *
                                Math.max(0, Math.min(bounds.bottom, existingBounds.bottom) - Math.max(bounds.top, existingBounds.top));
              const testArea = (bounds.right - bounds.left) * (bounds.bottom - bounds.top);
              if (overlapArea / testArea > 0.3) { // More than 30% overlap
                hasMajorOverlap = true;
                break;
              }
            }
          }
          
          if (!hasMajorOverlap) {
            positioned.push(testWord);
            foundSpot = true;
          }
          
          fallbackAttempts++;
        }
        
        // Ultimate fallback - place randomly
        if (!foundSpot) {
          const x = (Math.random() - 0.5) * availableWidth;
          const y = (Math.random() - 0.5) * availableHeight;
          positioned.push({
            ...word,
            x,
            y,
            color,
            rotation: Math.random() * 40 - 20,
            theme
          });
        }
      }
    });
    
    setWords(positioned);
  }, [wordData, themeColors]);

  const getFontSize = (value: number) => {
    const minSize = 12;
    const maxSize = 48;
    const minValue = Math.min(...wordData.map(w => w.value));
    const maxValue = Math.max(...wordData.map(w => w.value));
    return minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize);
  };

  const themeLabels: Record<string, string> = {
    emerging: 'Émergent',
    decreasing: 'En baisse',
    new: 'Nouveaux',
  };

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Nuage des Thématiques</CardTitle>
          <ToolTipsProvider title="Nuage de mots interactif affichant les mentions principales liées à la livraison de nourriture avec des thèmes codés par couleur. Cuisines émergentes (vert), préférences en baisse (rouge) et nouvelles tendances (bleu). Survolez les mots pour voir leur popularité et leur catégorisation en arabe, français et anglais." />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">

        <div className="relative bg-slate-700/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700">
          <div className="relative h-[400px] w-[600px] flex items-center justify-center mx-auto">
            {words.map((word, index) => {
              const fontSize = getFontSize(word.value);
              const isHovered = hoveredWord === index;
              
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-300 cursor-pointer select-none"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translate(-50%, -50%) rotate(${word.rotation}deg) scale(${isHovered ? 1.2 : 1})`,
                    fontSize: `${fontSize}px`,
                    color: word.color,
                    fontWeight: isHovered ? '800' : '600',
                    textShadow: isHovered 
                      ? `0 0 20px ${word.color}80, 0 0 40px ${word.color}40`
                      : `0 2px 4px rgba(0,0,0,0.3)`,
                    zIndex: isHovered ? 100 : Math.floor(word.value)
                  }}
                  onMouseEnter={() => setHoveredWord(index)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word.text}
                  {isHovered && (
                    <div 
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ transform: `translateX(-50%) rotate(${-word.rotation}deg)` }}
                    >
                      Poids : {word.value}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {Object.entries(themeColors).map(([theme, colors]) => (
            <div key={theme} className="flex items-center gap-3">
              <span className="capitalize text-sm font-medium">{themeLabels[theme] ?? theme}</span>
              <div className="flex gap-1">
                {colors.map((color, i) => (
                  <div key={i} className="w-4 h-4 rounded-sm border border-slate-600" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-4 bg-slate-700/40 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700">
            <span className="text-black text-sm">Total de mots :</span>
            <span className="text-white font-semibold">{words.length}</span>
          </div>
        </div>
      </CardContent>

      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} style={{ display: "inline-block", verticalAlign: "middle" }} />
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}>
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Food delivery analysis shows strong demand for pizza and burgers across all languages, with Arabic speakers showing particular interest in traditional cuisine. French customers emphasize quality and freshness, while English speakers focus on speed and convenience. Monitor blue-themed keywords for emerging food trends and red-themed terms for declining preferences that may need menu adjustments.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WordCloud;