"""MediaPipe Object Detection."""

import enum
from typing import NamedTuple, Union

import numpy as np
from mediapipe.framework.formats import detection_pb2
from mediapipe.framework.formats import location_data_pb2
# The following imports are needed because python pb2 silently discards
# unknown protobuf fields.
# pylint: disable=unused-import
from mediapipe.calculators.image import image_transformation_calculator_pb2
from mediapipe.calculators.tflite import tflite_converter_calculator_pb2
from mediapipe.calculators.tflite import tflite_inference_calculator_pb2
from mediapipe.calculators.tflite import ssd_anchors_calculator_pb2
from mediapipe.calculators.tflite import tflite_tensors_to_detections_calculator_pb2
from mediapipe.calculators.util import non_max_suppression_calculator_pb2
from mediapipe.calculators.util import detection_label_id_to_text_calculator_pb2
# pylint: enable=unused-import
from mediapipe.python.solutions import download_utils
from mediapipe.python.solution_base import SolutionBase

BINARYPB_FILE_PATH = 'mediapipe/modules/object_detection/object_detection_cpu.binarypb'


def _download_oss_object_detection_model():
    download_utils.download_oss_model(
        'mediapipe/modules/object_detection/object_detection.tflite')
    download_utils.download_oss_model(
        'mediapipe/modules/object_detection/object_detection_label.txt')


class ObjectDetection(SolutionBase):
    """MediaPipe Object Detection.
    MediaPipe Object Detection processes an RGB image and returns a list of the
    detected object location data along with the detection labels.
    Please refer to
    https://solutions.mediapipe.dev/object_detection#python-solution-api
    for usage examples.
    """

    def __init__(self, max_object_detection=3,
                 min_detection_confidence=0.6,
                 min_suppression_threshold=0.4):
        """Initializes a MediaPipe Object Detection object.
        Args:
          max_object_detection:
          min_detection_confidence: Minimum confidence value ([0.0, 1.0]) for object
              detection to be considered successful. See details in
              https://solutions.mediapipe.dev/object_detection#min_detection_confidence.
          min_suppression_threshold:
        """
        # _download_oss_object_detection_model()
        super().__init__(
            binary_graph_path=BINARYPB_FILE_PATH,
            calculator_params={
                'TfLiteTensorsToDetectionsCalculator.min_score_thresh':
                    min_detection_confidence,
                'NonMaxSuppressionCalculator.min_suppression_threshold':
                    min_suppression_threshold,
                'NonMaxSuppressionCalculator.max_num_detections':
                    max_object_detection,
            },
            outputs=['detections'])

    def process(self, image: np.ndarray) -> NamedTuple:
        """Processes an RGB image and returns a list of the detected object data.
        Args:
          image: An RGB image represented as a numpy ndarray.
        Raises:
          RuntimeError: If the underlying graph throws any error.
          ValueError: If the input image is not three channel RGB.
        Returns:
          A NamedTuple object with a "detections" field that contains a list of the
          detected object data.
        """

        return super().process(input_data={'image': image})