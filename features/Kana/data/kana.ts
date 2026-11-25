export interface KanaGroup {
  kana: string[];
  romanji: string[];
  altRomanji?: string[][];
  groupName: string;
}

// The original app used this shape for hiragana and katakana rows. The group
// names keep their old prefixes because menus and progress stores key off
// them: h. is Letters, k. is Digits and Phrases, challenge. is confusables.
//
// Spellings follow ICAO, so "alfa" has one l and "juliett" has two t. The
// common spellings live in altRomanji and are accepted as correct answers.
export const kana: KanaGroup[] = [
  { kana: ['A'], romanji: ['alfa'], altRomanji: [['alpha']], groupName: 'h.letter.a' },
  { kana: ['B'], romanji: ['bravo'], groupName: 'h.letter.b' },
  { kana: ['C'], romanji: ['charlie'], groupName: 'h.letter.c' },
  { kana: ['D'], romanji: ['delta'], groupName: 'h.letter.d' },
  { kana: ['E'], romanji: ['echo'], groupName: 'h.letter.e' },
  { kana: ['F'], romanji: ['foxtrot'], groupName: 'h.letter.f' },
  { kana: ['G'], romanji: ['golf'], groupName: 'h.letter.g' },
  { kana: ['H'], romanji: ['hotel'], groupName: 'h.letter.h' },
  { kana: ['I'], romanji: ['india'], groupName: 'h.letter.i' },
  { kana: ['J'], romanji: ['juliett'], altRomanji: [['juliet']], groupName: 'h.letter.j' },
  { kana: ['K'], romanji: ['kilo'], groupName: 'h.letter.k' },
  { kana: ['L'], romanji: ['lima'], groupName: 'h.letter.l' },
  { kana: ['M'], romanji: ['mike'], groupName: 'h.letter.m' },
  { kana: ['N'], romanji: ['november'], groupName: 'h.letter.n' },
  { kana: ['O'], romanji: ['oscar'], groupName: 'h.letter.o' },
  { kana: ['P'], romanji: ['papa'], groupName: 'h.letter.p' },
  { kana: ['Q'], romanji: ['quebec'], groupName: 'h.letter.q' },
  { kana: ['R'], romanji: ['romeo'], groupName: 'h.letter.r' },
  { kana: ['S'], romanji: ['sierra'], groupName: 'h.letter.s' },
  { kana: ['T'], romanji: ['tango'], groupName: 'h.letter.t' },
  { kana: ['U'], romanji: ['uniform'], groupName: 'h.letter.u' },
  { kana: ['V'], romanji: ['victor'], groupName: 'h.letter.v' },
  { kana: ['W'], romanji: ['whiskey'], groupName: 'h.letter.w' },
  { kana: ['X'], romanji: ['x-ray'], altRomanji: [['xray', 'x ray', 'exray']], groupName: 'h.letter.x' },
  { kana: ['Y'], romanji: ['yankee'], groupName: 'h.letter.y' },
  { kana: ['Z'], romanji: ['zulu'], groupName: 'h.letter.z' },

  { kana: ['0'], romanji: ['zero'], groupName: 'k.digit.0' },
  { kana: ['1'], romanji: ['wun'], altRomanji: [['one']], groupName: 'k.digit.1' },
  { kana: ['2'], romanji: ['too'], altRomanji: [['two']], groupName: 'k.digit.2' },
  { kana: ['3'], romanji: ['tree'], altRomanji: [['three']], groupName: 'k.digit.3' },
  { kana: ['4'], romanji: ['fower'], altRomanji: [['four']], groupName: 'k.digit.4' },
  { kana: ['5'], romanji: ['fife'], altRomanji: [['five']], groupName: 'k.digit.5' },
  { kana: ['6'], romanji: ['six'], groupName: 'k.digit.6' },
  { kana: ['7'], romanji: ['seven'], groupName: 'k.digit.7' },
  { kana: ['8'], romanji: ['eight'], groupName: 'k.digit.8' },
  { kana: ['9'], romanji: ['niner'], altRomanji: [['nine']], groupName: 'k.digit.9' },

  { kana: ['roger'], romanji: ['message received'], groupName: 'k.phrase.roger' },
  { kana: ['wilco'], romanji: ['will comply'], groupName: 'k.phrase.wilco' },
  { kana: ['over'], romanji: ['awaiting reply'], groupName: 'k.phrase.over' },
  { kana: ['out'], romanji: ['end of conversation'], groupName: 'k.phrase.out' },
  { kana: ['copy'], romanji: ['understood'], groupName: 'k.phrase.copy' },
  { kana: ['affirm'], romanji: ['yes'], altRomanji: [['affirmative']], groupName: 'k.phrase.affirm' },
  { kana: ['negative'], romanji: ['no'], groupName: 'k.phrase.negative' },
  { kana: ['say again'], romanji: ['repeat'], altRomanji: [['say again please']], groupName: 'k.phrase.say-again' },
  { kana: ['stand by'], romanji: ['wait'], groupName: 'k.phrase.stand-by' },
  { kana: ['go ahead'], romanji: ['proceed'], groupName: 'k.phrase.go-ahead' },
  { kana: ['mayday'], romanji: ['distress'], groupName: 'k.phrase.mayday' },
  { kana: ['pan pan'], romanji: ['urgent'], groupName: 'k.phrase.pan-pan' },
  { kana: ['hold'], romanji: ['hold position'], groupName: 'k.phrase.hold' },
  { kana: ['approach'], romanji: ['landing'], groupName: 'k.phrase.approach' },
  { kana: ['clearance'], romanji: ['permission'], groupName: 'k.phrase.clearance' },
  { kana: ['taxi'], romanji: ['ground movement'], groupName: 'k.phrase.taxi' },
  { kana: ['squawk'], romanji: ['transponder'], groupName: 'k.phrase.squawk' },
  { kana: ['ready'], romanji: ['prepared'], groupName: 'k.phrase.ready' },
  { kana: ['contact'], romanji: ['call'], groupName: 'k.phrase.contact' },
  { kana: ['monitor'], romanji: ['listen'], groupName: 'k.phrase.monitor' },
  { kana: ['confirm'], romanji: ['verify'], groupName: 'k.phrase.confirm' },
  { kana: ['correct'], romanji: ['right'], groupName: 'k.phrase.correct' },
  { kana: ['unable'], romanji: ['cannot'], groupName: 'k.phrase.unable' },
  { kana: ['expedite'], romanji: ['hurry'], groupName: 'k.phrase.expedite' },

  { kana: ['B', 'D'], romanji: ['bravo', 'delta'], groupName: 'challenge.b-d' },
  { kana: ['G', 'J'], romanji: ['golf', 'juliett'], groupName: 'challenge.g-j' },
  { kana: ['M', 'N'], romanji: ['mike', 'november'], groupName: 'challenge.m-n' },
  { kana: ['P', 'B'], romanji: ['papa', 'bravo'], groupName: 'challenge.p-b' },
  { kana: ['V', 'W'], romanji: ['victor', 'whiskey'], groupName: 'challenge.v-w' },
  { kana: ['S', 'F'], romanji: ['sierra', 'foxtrot'], groupName: 'challenge.s-f' },
  { kana: ['I', 'Y'], romanji: ['india', 'yankee'], groupName: 'challenge.i-y' },
  { kana: ['Q', 'K'], romanji: ['quebec', 'kilo'], groupName: 'challenge.q-k' },
  { kana: ['X', 'Z'], romanji: ['x-ray', 'zulu'], groupName: 'challenge.x-z' },
];
