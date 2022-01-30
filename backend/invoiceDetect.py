# Copyright (c) 2020 Sarthak Mittal
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

import os
import glob
import json
import argparse
import sys
sys.path.append('D:\TAMUhack-2022\InvoiceNet')

from invoicenet import FIELDS
from invoicenet.acp.acp import AttendCopyParse



def predict(filename):
    predictions = {}
    #models = os.listdir('../InvoiceNet/models/invoicenet/')
    fields = ["vendor_name", "address", "date", "total"]
    paths = [filename]
    for field in fields:
        print("\nExtracting field '{}' from {} invoices...\n".format(field, len(paths)))
        model = AttendCopyParse(field=field, restore=True)
        predictions[field] = model.predict(paths=paths) 

    
    for idx, filename in enumerate(paths):
        labels = {}
        for field in predictions.keys():
            labels[field] = predictions[field][idx]
            print("  {}: {}".format(field, labels[field]))

    return labels
