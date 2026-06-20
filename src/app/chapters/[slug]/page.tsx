import Navbar from "@/components/navbar";
import CustomCursor from "@/components/customcursor";
import ParticleStars from "@/components/particlestars";
import ChapterStory from "@/components/chapterstory";
import { notFound } from "next/navigation";

const chapterData: Record<string, {
  number: string;
  romanNumeral: string;
  title: string;
  subtitle: string;
  year: string;
  story: string[];
  nextSlug: string | null;
  nextTitle: string | null;
}> = {
  "from-funeral-to-ball": {
    number: "01",
    romanNumeral: "I",
    title: "From Funeral to Ball",
    subtitle: "Winter, 1779",
    year: "1779",
    nextSlug: "the-unopened-letter",
    nextTitle: "The Unopened Letter",
    story: [
      "The procession left the Strahlborn estate at dawn, when the frost had not yet decided whether it would melt or deepen. Fourteen carriages moved in silence through the birch forest, their black curtains drawn against a sky the colour of old pewter.",
      "Count Aldric Strahlborn had died on the fourteenth of December, 1779, of what the physician recorded as 'a failure of the heart's resolve.' He was sixty-one years old. He had outlived two wives, one son, and every expectation his family had placed upon him — and still managed to die at a time that caused the maximum possible inconvenience.",
      "The inconvenience was this: the Grand Winter Ball of the De Rionzini family was scheduled for that very evening.",
      "There are rules, in aristocratic society, about such things. Mourning periods. Appropriate silences. The correct number of weeks before one is permitted to be seen smiling again. Count Aldric had known these rules as well as anyone. He had, according to his valet, spent his final coherent hours muttering about them with something that sounded disturbingly like satisfaction.",
      "The ball could not be cancelled. The invitations had gone out to forty-seven families across three provinces. The De Rionzini name — already under quiet scrutiny following certain financial irregularities the previous spring — could not afford the social damage of a cancellation.",
      "And so it was decided, in a hushed conversation between Countess Elara De Rionzini and her eldest son Matteo, that the ball would proceed. The Strahlborn family would be represented by the Count's daughter, Sonja, who was twenty-three years old, recently widowed herself, and possessed of the particular composure that comes from having already survived one catastrophe.",
      "Sonja Strahlborn dressed for the ball in her mother's old black silk — a gown twenty years out of fashion, severe as a sentence. Her lady's maid had wept while fastening the buttons. Sonja had not.",
      "She arrived at the De Rionzini estate at nine in the evening. The ballroom was lit with four hundred candles. The orchestra was playing Haydn. The room smelled of pine resin, beeswax, and the particular anxiety of people pretending that everything was perfectly fine.",
      "Matteo De Rionzini met her at the door. He was thirty-one, dark-haired, with the careful eyes of a man who had learned early that information was more valuable than land. He took her gloved hand and said, very quietly, so that no one else could hear:",
      "'Your father was a good man. I am sorry the world required this of you tonight.'",
      "Sonja looked at him for a long moment. Then she stepped past him into the ballroom, into the light and the music and the two hundred people who were all, in their different ways, watching to see what she would do.",
      "She danced. Not well — she had never been a particularly gifted dancer — but with a kind of deliberate precision, as if each step were a word in a language she was determined to speak correctly.",
      "It was the first time Sonja Strahlborn and Matteo De Rionzini had been in the same room since the incident at the Vienna archive three years earlier — an incident that neither of them had spoken of since, and that both of them, in their different ways, had never stopped thinking about.",
      "The ball ended at two in the morning. By then, the frost outside had deepened. The carriages moved back through the birch forest in a darkness that was almost total, the candle-lanterns casting small yellow circles on the snow.",
      "In the third carriage, Sonja Strahlborn sat alone and looked out at the trees going past and thought about what Matteo De Rionzini had said to her, and what he had not said, and what the difference between those two things might eventually cost.",
    ],
  },
  "the-unopened-letter": {
    number: "02",
    romanNumeral: "II",
    title: "The Unopened Letter",
    subtitle: "Spring, 1780",
    year: "1780",
    nextSlug: "a-portrait-without-a-name",
    nextTitle: "A Portrait Without a Name",
    story: [
      "The false wall in the east library was discovered on the third of April, 1780, by a carpenter named Brandt who had been hired to repair a water-damaged section of shelving. He found it by accident — the shelving unit swung outward when he leaned against it, revealing a narrow space behind, approximately four feet deep and eight feet wide.",
      "Inside were three things: a wooden chest, a child's drawing of a house, and a letter.",
      "The chest contained documents — legal papers, mostly, written in a formal hand that dated them to the 1740s. The child's drawing was unsigned and undated. The letter was sealed with red wax, bearing an impression of a crest that Brandt did not recognise.",
      "He reported his findings to Sonja Strahlborn, who was then managing the estate in the absence of any male heirs. She came to the library immediately, examined all three items, and instructed Brandt to speak of this to no one. She paid him generously. He was, by all accounts, an honest man who understood the value of discretion.",
      "Sonja placed the letter on her writing desk, where it remained, unopened, for eleven days.",
      "She was not afraid of what it contained. She was, rather, conducting an experiment in patience — waiting to see whether the letter's existence would become known before she chose to act on it. In aristocratic households of this period, secrets had a way of travelling through walls. If anyone else knew about the letter, they would reveal themselves by the quality of their silences.",
      "No one's silence changed. On the twelfth day, she opened it.",
      "The letter was written in French, in a hand she did not recognise, addressed to her father. It was dated the fifteenth of March, 1761 — eighteen years earlier, when Sonja had been three years old.",
      "It began: 'My dear Aldric, I write to you because I have no one else to write to, and because what I am about to tell you will change the nature of everything between our families, and you deserve to hear it from me directly, before the lawyers make it something uglier than it needs to be.'",
      "The letter was four pages long. Sonja read it twice, then a third time.",
      "When she had finished, she sat for a long time without moving, looking at the crest on the broken seal. It was the De Rionzini crest — but not the current version. This was an older form, used by the family before 1770, when they had quietly updated their heraldry following a legal dispute the details of which had never been made fully public.",
      "She thought about Matteo De Rionzini, and his careful eyes, and the thing he had said to her at the ball in December.",
      "She thought about her father, who had kept this letter hidden behind a false wall for eighteen years, and who had died without ever telling her it existed.",
      "Then she folded the letter carefully, placed it inside her personal correspondence case, locked it, and went to write a note requesting a meeting with Matteo De Rionzini at his earliest convenience.",
      "She did not mention the letter in the note. She did not need to. The request itself would be enough. He would know.",
    ],
  },
  "a-portrait-without-a-name": {
    number: "03",
    romanNumeral: "III",
    title: "A Portrait Without a Name",
    subtitle: "Summer, 1780",
    year: "1780",
    nextSlug: "the-winter-inheritance",
    nextTitle: "The Winter Inheritance",
    story: [
      "The portrait had hung in the east gallery of the Strahlborn estate for as long as anyone could remember. It showed a woman of approximately thirty years, dressed in the fashion of the 1740s, seated in a garden chair with her hands folded in her lap. She was looking slightly to the left of the painter, as if something just outside the frame had caught her attention at the last moment.",
      "She was not beautiful, exactly. She had a face that rewarded attention — the kind of face that looked different depending on the quality of the light and the mood of the person looking at it.",
      "There was no nameplate on the frame. No inscription on the back. No record of the portrait in any of the estate inventories that Sonja had been able to locate. The painter's signature in the lower right corner was illegible — deliberately so, she had begun to suspect.",
      "Everyone in the family knew the portrait. No one spoke about it.",
      "This was the thing that had always struck Sonja as strange — not the absence of a name, but the quality of the silence around it. It was not an ignorant silence. It was a decided one. People looked at the portrait and then looked away with a particular kind of care, the way you look away from something you have been told not to see.",
      "She brought Matteo De Rionzini to see it on a Tuesday afternoon in July, three weeks after their first meeting following the discovery of the letter.",
      "He stood in front of it for a long time without speaking. Then he said: 'How old is this gallery?'",
      "'The house was built in 1698,' Sonja said. 'The gallery was added in 1742.'",
      "He nodded slowly. 'The garden in the background,' he said. 'Do you recognise it?'",
      "She looked at the painted garden behind the woman's chair — a formal arrangement of low hedges and stone paths that she had always assumed was generic, the kind of decorative background that painters of that period used as a neutral setting.",
      "'No,' she said. Then, looking more carefully: 'Should I?'",
      "'It is the De Rionzini garden,' Matteo said. 'The south garden, before my grandfather had it redesigned in 1758. I have seen drawings of it. The arrangement of the hedges is distinctive — that particular angle at the southeast corner. I would know it anywhere.'",
      "They stood together in front of the portrait for a while after that, not speaking.",
      "The woman in the painting continued to look at something just outside the frame, her hands folded, her expression holding its secret with the patience of someone who has been keeping it for a very long time and sees no reason to stop now.",
      "'She was at your estate,' Sonja said finally. 'This was painted at the De Rionzini estate. But she is hanging in our gallery.'",
      "'Yes,' said Matteo.",
      "'And no one in either family will say who she is.'",
      "'No,' said Matteo. 'They will not.'",
      "He turned away from the portrait and walked to the gallery window and looked out at the summer garden below, and Sonja watched him and understood that he knew more than he was saying, and that whatever he knew was something he was not yet ready to tell her.",
      "She was beginning to understand that patience was going to be the most important thing she possessed in whatever this was becoming.",
    ],
  },
  "the-winter-inheritance": {
    number: "04",
    romanNumeral: "IV",
    title: "The Winter Inheritance",
    subtitle: "Autumn, 1781",
    year: "1781",
    nextSlug: null,
    nextTitle: null,
    story: [
      "The legal transfer of the Strahlborn estate was completed on the ninth of November, 1781, in the offices of a notary in the city, in the presence of three lawyers, two witnesses, and Sonja Strahlborn, who signed every document with her full name in a hand that did not tremble.",
      "The estate had been sold. Not because Sonja had wanted to sell it, but because the debts her father had left behind were larger than anyone had known — larger, it emerged, than her father had known himself, or so the lawyers claimed, with the careful ambiguity of men who had been paid to be ambiguous.",
      "The debts went back twenty years. Some of them were straightforward: loans taken against the estate's future harvest income, a common enough practice. Others were more obscure — obligations recorded in private ledgers that had not been presented to the family solicitor during the Count's lifetime, only surfacing after his death when the full accounting was finally, reluctantly assembled.",
      "It was in one of these private ledgers that the name appeared.",
      "Sonja found it herself, on a wet October afternoon, working through a box of her father's papers that had been set aside as 'miscellaneous correspondence and accounts.' The ledger was small, bound in brown calfskin, with her father's initials stamped on the cover. Inside, forty pages of careful entries in his own handwriting — dates, amounts, names.",
      "Most of the names she recognised. One she did not.",
      "It appeared seven times across the ledger, always as the recipient of payments, never as a creditor. The amounts were not large — twenty florins here, thirty-five there — but the regularity of them, one or twice a year for eleven years between 1762 and 1773, suggested something deliberate. Something maintained.",
      "The name was written in her father's hand as simply: 'V. Strahlborn.'",
      "There were no other Strahlborns. Sonja knew her family's genealogy well enough to be certain of this. Her father had been the last of his line on the male side. Her mother's family were Kesslers. There were no cousins, no branches, no V. Strahlborn anywhere in any document she had ever seen.",
      "She brought this to Matteo De Rionzini's attention two days later, in the same quiet meeting room where they had been conducting their increasingly complicated conversations for the past year.",
      "He looked at the ledger for a long time. Then he said: 'V could be a first initial. Or it could be an abbreviation.'",
      "'An abbreviation of what?'",
      "He was quiet for a moment. Outside, the first snow of the season had begun to fall, soft and deliberate against the window.",
      "'Von,' he said finally. 'In older documents, the particle was sometimes used as a prefix rather than an infix. V. Strahlborn could mean Von Strahlborn — which is a different name. A different person.'",
      "'Who is Von Strahlborn?'",
      "He looked at her then with those careful eyes, and she could see him making a decision — one of those moments where you can watch a person choose between two versions of the truth and reach for the one that will cost them more.",
      "'She is the woman in the portrait,' he said. 'Her name was Vera Von Strahlborn. She was my grandfather's first wife. The marriage was annulled in 1749 and erased from all official records. I found the documentation in Vienna, in the archive, three years ago. That is what I was doing there when we encountered each other. That is what I have been trying to find a way to tell you.'",
      "The snow continued to fall outside. Sonja Strahlborn sat very still and let the full weight of what she had just heard settle into its proper place — the false wall, the letter, the portrait, the ledger, the annulled marriage, the payments, the silence of two families across thirty years.",
      "It did not feel like an ending. It felt like the moment before something begins.",
      "'Tell me,' she said, 'everything.'",
    ],
  },
};

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapterData[slug];
  if (!chapter) notFound();
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <ChapterStory chapter={chapter} />
      <ParticleStars />
    </main>

  );
}