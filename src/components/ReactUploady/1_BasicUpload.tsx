import UploadButton from '@rpldy/upload-button'
import UploadPreview from '@rpldy/upload-preview'
import Uploady, { useItemFinishListener } from '@rpldy/uploady'
import React, { useState } from 'react'
import styled from 'styled-components';

const PreviewContainer = styled.div`
  margin-top: 20px;

  img {
    max-width: 90%;
  }
`;
const UploadButtonWithDoneMessage = () => {
	const [finished, setFinished] = useState<string[]>([]);

	useItemFinishListener((item) => {
		setFinished((finished) =>
			finished.concat(`${item.file.name} (${item.file.size})`));
	});

	return (
		<>
			<UploadButton>Upload File(s)</UploadButton>
			<ul>
				{finished.map((name) =>
					<li key={name}>finished: {name}</li>)}
			</ul>
		</>
	);
};

function BasicUpload() {

    return (
        <div>
            <Uploady
                destination={{
                    url: "http://localhost:5173/", params: {
                        foo: "bar",
                    },
                }}
            >
                <UploadButton destination={{
                    headers: {
                        "X-Requested-With": "uploady",
                    },
                }}>
                    Upload File
                </UploadButton>

                <PreviewContainer>
                    <UploadPreview />
                </PreviewContainer>



            </Uploady>
            <Uploady destination={{
                    url: "http://localhost:5173/", params: {
                        foo: "bar",
                    },
                }}>
                <UploadButtonWithDoneMessage/>
            </Uploady>
        </div>
    )
}

export default BasicUpload
