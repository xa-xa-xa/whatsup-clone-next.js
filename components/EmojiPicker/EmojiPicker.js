import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";

const EmojiPicker = ({ setInput, inputRef, setOpenEmojiPicker }) => {
  // Insert emoji
  function insertEmoji(emoji) {
    const ref = inputRef.current;
    ref.focus();
    const textBefore = ref.value.substring(0, ref.selectionStart);
    const textAfter = ref.value.substring(ref.selectionEnd);
    const textAfterInsertion = textBefore + emoji.native + textAfter;
    setInput(textAfterInsertion);
    setOpenEmojiPicker(false);
  }

  return (
    <EmojiPickerContainer>
      <Picker
        emoji=""
        title=""
        size={20}
        set="apple"
        onSelect={(emoji) => insertEmoji(emoji)}
        showPreview={false}
        showSkinTones={false}
        emojiTooltip={true}
      />
    </EmojiPickerContainer>
  );
};

export default EmojiPicker;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 10px;
  z-index: 2;
`;
