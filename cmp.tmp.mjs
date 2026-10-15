import fs from 'fs';

const strip = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split('\n')
  .map((l) => l.replace(/\/\/.*$/, '').trim())
  .filter(Boolean)
  .map((l) => l.replace(/\s+/g, ' '))
  .join('\n');

const avant = strip(fs.readFileSync('before-style.tmp.css', 'utf8'));
const apres = strip(fs.readFileSync('src/css/style.css', 'utf8'));

const aL = avant.split('\n');
const bL = apres.split('\n');

console.log(`Lignes de code AVANT (hors commentaires) : ${aL.length}`);
console.log(`Lignes de code APRES (hors commentaires) : ${bL.length}`);

if (avant === apres) {
  console.log('\nIDENTIQUE -> aucun changement de valeur, seul du commentaire a ete retire.');
} else {
  console.log('\nDIFFERENCE DETECTEE :');
  const max = Math.max(aL.length, bL.length);
  let d = 0;
  for (let i = 0; i < max; i++) {
    if (aL[i] !== bL[i]) {
      d++;
      console.log(`  L${i + 1}`);
      console.log(`    avant : ${aL[i] ?? '(absent)'}`);
      console.log(`    apres : ${bL[i] ?? '(absent)'}`);
    }
  }
  console.log(`  ${d} difference(s)`);
}

const tokens = (s) => [...s.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => `${m[1]} = ${m[2].trim()}`);
const tAv = tokens(avant), tAp = tokens(apres);
console.log(`\nTokens AVANT : ${tAv.length} -> APRES : ${tAp.length}`);
const manquants = tAv.filter((t) => !tAp.includes(t));
const ajouts = tAp.filter((t) => !tAv.includes(t));
console.log(manquants.length ? 'Tokens PERDUS : ' + manquants.join(' | ') : 'Aucun token perdu [OK]');
console.log(ajouts.length ? 'Tokens AJOUTES : ' + ajouts.join(' | ') : 'Aucun token ajoute [OK]');
